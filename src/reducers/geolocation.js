import * as actionTypes from '../actions'

export default function geolocation(state={
  lat: 25.0497133,
  lng: 121.516291
}, action) {
  switch (action.type) {
    case actionTypes.LOCATION_SUCCESS:
      return Object.assign({}, state, action.location)
    case actionTypes.LOCATION_FAILED:
      return state
    default:
      return state
  }
}
