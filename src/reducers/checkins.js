import * as actionTypes from '../actions'

export default function checkins(state={
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case actionTypes.CHECKINS_REQUEST:
      return Object.assign({}, state, { isFetching: action.isFetching })
    case actionTypes.CHECKINS_SUCCESS:
      return Object.assign({}, state, { isFetching: false, items: action.checkins })
    default:
      return state
  }
}
