import * as actionTypes from '../actions'

export default function user(state={}, action) {
  switch (action.type) {
    case actionTypes.GET_USER_SUCCESS:
      return Object.assign({}, state, action.user)
    default:
      return state
  }
}
