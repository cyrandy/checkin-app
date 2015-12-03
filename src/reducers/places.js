import * as actionTypes from '../actions'

export default function places(state={
  places: undefined
}, action) {
  switch (action.type) {
    case actionTypes.PLACES_SUCCESS:
      return Object.assign({}, state, {places: Object.assign({}, state.places, action.places)})
    default:
      return state
  }
}
