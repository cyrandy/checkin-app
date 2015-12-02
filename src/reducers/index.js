import { combineReducers } from 'redux'
import geolocation from './geolocation'

const rootReducer = combineReducers({
  geolocation,
})

export { geolocation }
export default rootReducer
