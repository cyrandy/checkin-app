import thunk from 'redux-thunk'
import mockStore from './helpers/mockStore'
import geolocate from './helpers/mockGeolocation'
import * as actions from '../src/actions'

const middlewares = [ thunk ]

describe('Actions', () => {
  describe('Geolocation', () => {
    beforeEach(() => {
      geolocate.use()
    })
    afterEach(() => {
      geolocate.restore()
    })

    it('creates LOCATION_SUCCESS with location when get geolocation success', (done) => {
      const expectedLocation = { lat: 10, lng: 20 }
      geolocate.sendPosition(expectedLocation)

      const expectedActions = [
        { type: actions.LOCATION_SUCCESS, location: expectedLocation },
      ]

      const store = mockStore(
        {},
        expectedActions,
        done
      ).applyMiddleware(middlewares)

      store.dispatch(actions.getUserLocation())
    })

    it('create LOCATION_FAILED when get geolocation failed', (done) => {
      const expectedError = { message: 'failed' }
      geolocate.shouldFailed(expectedError)

      const expectedActions = [
        { type: actions.LOCATION_FAILED, error: expectedError }
      ]
      const store = mockStore(
        {},
        expectedActions,
        done
      ).applyMiddleware(middlewares)

      store.dispatch(actions.getUserLocation())
    })
  })
})
