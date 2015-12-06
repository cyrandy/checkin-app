import * as actionTypes from '../actions'

export default function login(state, action) {
  if (!state) {
    let loginSuccess = false
    if (localStorage['TOKEN']) {
      loginSuccess = true
    }
    return { loginSuccess }
  }
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, { loginSuccess: true })
    default:
      return state
  }
}
