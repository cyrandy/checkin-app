import * as actionTypes from '../actions'

export default function places(state={}, action) {
  switch (action.type) {
    case actionTypes.PLACES_SUCCESS:
      return Object.assign({}, state, Object.assign({}, state.places, action.places))
    default:
      return state
  }
}
