import * as actionTypes from '../actions'

export default function login(state={loginSuccess: false}, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, { loginSuccess: true })
    default:
      return state
  }
}
