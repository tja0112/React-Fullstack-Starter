import { ADD_ITEM, GET_LIST, EDIT_ITEM, DELETE_ITEM } from '../constants';

const init = {
};

export default (state = init, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return
    case GET_LIST:
      return
    case EDIT_ITEM:
      return
    case DELETE_ITEM:
      return
    default:
      return state;
  }
}
