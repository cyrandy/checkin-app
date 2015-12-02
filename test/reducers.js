import { expect } from 'chai'
import * as reducers from '../src/reducers'
import * as actionTypes from '../src/actions'

describe('Reducers', () => {
  describe('Geolocation', () => {
    let initialState = { lat: 25.0497133, lng: 121.516291 }

    it('should return initial state', () => {
      expect(reducers.geolocation(undefined, {})).to.eql(initialState)
    })

    it('should handle LOCATION_SUCCESS', () => {
      let location = { lat: 10, lng: 20 }
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
