import { combineReducers } from 'redux'
import checkins from './checkins'
import geolocation from './geolocation'

const rootReducer = combineReducers({
  checkins,
  geolocation,

})

export { checkins, geolocation }
export default rootReducer
