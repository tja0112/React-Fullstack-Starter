import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Paper, Typography, TextField, Select, Input, Switch } from 'material-ui';
import { InputLabel } from 'material-ui/Input';
import { FormControl, FormGroup, FormLabel } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';

import { INITIAL } from '../constants';

/**
 * @name render - rendering component
 */

const renderTextField = ({ input, meta: { touched, error }, ...other }) => (
  <div>
    <div>
      <TextField {...input} {...other} />
    </div>

    {touched && error && <div style={{ color: '#F44336' }}>{error}</div>}
  </div>
);

const renderSelect = ({ input, label, meta: { touched, error }, list, ...other }) => (
  <div>
    <div>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <Select
        {...input}
        {...other}
        input={<Input id={label} style={{ width: '7rem' }} />}
      >
        <MenuItem value=""><em>None</em></MenuItem>
        {
          list.map(({ value, label }, index) => (
            <MenuItem key={index} value={value}>{label}</MenuItem>
          ))
        }
      </Select>
    </div>

    {touched && error && <div style={{ color: '#F44336' }}>{error}</div>}
  </div>
);

const renderMultipleSelect = ({ input, label, meta: { touched, error }, list, ...other }) => (
  <div>
    <div>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <Select
        {...input}
        {...other}
        multiple
        value={input.value || []}
        input={<Input id={label} style={{ width: '15rem' }} />}
      >
        <MenuItem value=""><em>None</em></MenuItem>
        {
          list.map((item, index) => (
            <MenuItem key={index} value={item}>{item}</MenuItem>
          ))
        }
      </Select>
    </div>

    {touched && error && <div style={{ color: '#F44336' }}>{error}</div>}
  </div>
);

const renderSwitch = ({ input, label, meta: { touched, error }, ...other }) => (
  <div>
    <div>
      <FormGroup row>
        <FormLabel component="legend" style={{ alignSelf: 'center' }}>{label}</FormLabel>
        <Switch
          {...input}
          {...other}
        />
      </FormGroup>
    </div>

    {touched && error && <div style={{ color: '#F44336' }}>{error}</div>}
  </div>
);

/**
 * @name Component
 */

let WithReduxForm = ({ selector }) => {

  return (
    <div className="container">
      <Paper>
        <Typography type="title" gutterBottom style={{ padding: '1rem 1rem 0' }}>
          With Redux Form
        </Typography>

        <form className="form">
          <div className="row">
            {/* input */}
            <FormControl>
              <Field name="name" component={renderTextField} label="Name" />
            </FormControl>
            <div className="outputs">{selector('name')}</div>
          </div>

          <div className="row">
            {/* select */}
            <FormControl>
              <Field name="age" component={renderSelect} label="Age" list={INITIAL['listOfage']} />
            </FormControl>
            <div className="outputs">{selector('age')}</div>
          </div>

          <div className="row">
            {/* multiple select */}
            <FormControl>
              <Field name="countries" component={renderMultipleSelect} label="Countries" list={INITIAL['listOfCountries']} />
            </FormControl>
            <div className="outputs">{selector('countries') ? selector('countries').join(', ') : selector('countries')}</div>
          </div>

          <div className="row">
            {/* switch */}
            <FormControl component="fieldset">
              <Field name="autoplay" component={renderSwitch} label="Autoplay" />
            </FormControl>
            <div className="outputs" style={{ padding: '0 0 .5rem' }}>
              {selector('autoplay') ? `${selector('autoplay')}`.charAt(0).toUpperCase() + `${selector('autoplay')}`.slice(1) : ''}
            </div>
          </div>

          <div className="row">
            ...
          </div>
        </form>
      </Paper>

      <style jsx>{`
        .container {
          margin: 2rem 0;
        }

        .form {
          padding: .5rem 1rem;
        }

        .row {
          padding: .66rem;
          display: flex;
          flex-direction: row;
        }

        .outputs {
          align-self: flex-end;
          margin: 0 0 .5rem .5rem;
          color: #3F51B5;
        }
      `}</style>
    </div>
  );
};

WithReduxForm = reduxForm({ form: 'example' })(WithReduxForm);

const selector = formValueSelector('example');

export default connect(
  state => ({
    selector: field => selector(state, field)
  })
)(WithReduxForm);
