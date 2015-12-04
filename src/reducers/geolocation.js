import * as actionTypes from '../actions'

export default function geolocation(state={
  lat: 25.047288,
  lng: 121.517455
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
