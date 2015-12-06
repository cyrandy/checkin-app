import { combineReducers } from 'redux'
import checkins from './checkins'
import geolocation from './geolocation'
import places from './places'
import user from './user'
import login from './login'

const rootReducer = combineReducers({
  checkins,
  geolocation,
  places,
  user,
  login
})

export { checkins, geolocation, places, user, login }
export default rootReducer
