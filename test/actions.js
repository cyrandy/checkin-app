import nock from 'nock'
import fetch from 'isomorphic-fetch'
import thunk from 'redux-thunk'
import mockStore from './helpers/mockStore'
import geolocate from './helpers/mockGeolocation'
import * as actions from '../src/actions'

const middlewares = [ thunk ]

describe('Actions', () => {
  describe('Checkins', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('should dispatch CHECKINS_SUCCESS when checkins api response', (done) => {
      const response = {
        checkins : [{
          id : 3,
          comment : "打卡3",
          photo : "",
          user_id : 2,
          place_id : 1,
          created_at : "2015-04-08T10:53:59.004Z"
        }, {
          id : 2,
          comment : "打卡2",
          photo : "",
          user_id : 2,
          place_id : 2,
          created_at : "2015-04-08T10:53:59.001Z"
        }]
      }

      nock('https://commandp-lbs-backend.herokuapp.com')
      .post('/api/v1/checkins/neighbor')
      .reply(200, response)

      const expectedActions = [
        { type: actions.CHECKINS_REQUEST, isFetching: true },
        { type: actions.CHECKINS_SUCCESS, checkins: response.checkins }
      ]
      const store = mockStore(
        {},
        expectedActions,
        done
      ).applyMiddleware(middlewares)

      store.dispatch(actions.getCheckins())
    })
  })

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
