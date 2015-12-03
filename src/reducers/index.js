import { combineReducers } from 'redux'
import checkins from './checkins'
import geolocation from './geolocation'
import places from './places'

const rootReducer = combineReducers({
  checkins,
  geolocation,
  places
})

export { checkins, geolocation, places }
export default rootReducer
