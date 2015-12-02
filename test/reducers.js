import { expect } from 'chai'
import * as reducers from '../src/reducers'
import * as actionTypes from '../src/actions'

describe('Reducers', () => {
  describe('Checkins', () => {
    const items = [{
      id : 2,
      comment : "打卡2",
      photo : "",
      user_id : 2,
      place_id : 2,
      created_at : "2015-04-08T10:53:59.001Z"
    }]
    it('should return initial state', () => {
      const initialState = {
        isFetching: false,
        items
      }
      expect(reducers.checkins(initialState, {})).to.eql(initialState)
    })

    it('should handle CHECKINS_REQUEST', () => {
      expect(reducers.checkins(undefined, {
        type: actionTypes.CHECKINS_REQUEST,
        isFetching: true
      })).to.eql({isFetching: true, items: []})
    })

    it('should handle CHECKINS_SUCCESS', () => {
      expect(reducers.checkins(undefined, {
        type: actionTypes.CHECKINS_SUCCESS,
        checkins: items
      })).to.eql({isFetching: false, items})
    })
  })

  describe('Geolocation', () => {
    const initialState = { lat: 25.0497133, lng: 121.516291 }

    it('should return initial state', () => {
      expect(reducers.geolocation(undefined, {})).to.eql(initialState)
    })

    it('should handle LOCATION_SUCCESS', () => {
      const location = { lat: 10, lng: 20 }
      expect(reducers.geolocation(undefined, {
        type: actionTypes.LOCATION_SUCCESS,
        location
      })).to.eql(location)
    })

    it('should handle LOCATION_FAILED and return initial state', () => {
      expect(reducers.geolocation(undefined, {
        type: actionTypes.LOCATION_FAILED,
        error: { message: 'failed' }
      })).to.eql(initialState)
    })
  })
})
