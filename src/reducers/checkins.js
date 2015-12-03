import * as actionTypes from '../actions'

export default function checkins(state={
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case actionTypes.CHECKINS_REQUEST:
      return Object.assign({}, state, { isFetching: action.isFetching, waitingPlaces: true })
    case actionTypes.CHECKINS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.checkins,
        center: action.center,
        waitingPlaces: true
      })
    case actionTypes.CHECKINS_PLACES_SUCCESS:
      if (state.center.lat === action.center.lat &&
          state.center.lng === action.center.lng) {
        return Object.assign({}, state, { waitingPlaces: false })
      }
      return state
    default:
      return state
  }
}
