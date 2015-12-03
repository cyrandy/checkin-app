import fetch from 'isomorphic-fetch'
import _ from 'lodash'

export const CHECKINS_REQUEST = 'CHECKINS_REQUEST'
export const CHECKINS_SUCCESS = 'CHECKINS_SUCCESS'
export const CHECKINS_PLACES_SUCCESS = 'CHECKINS_PLACES_SUCCESS'

function requestCheckins() {
  return { type: CHECKINS_REQUEST, isFetching: true }
}

function requestCheckinsSuccess(checkins, center) {
  return { type: CHECKINS_SUCCESS, checkins, center }
}

function getCheckinsPlacesSuccess(center) {
  return { type: CHECKINS_PLACES_SUCCESS, center }
}

export function getCheckins(lat = 25.045, lng = 121.532) {
  return function (dispatch) {
    dispatch(requestCheckins())
    fetch('https://commandp-lbs-backend.herokuapp.com/api/v1/checkins/neighbor', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'TOKEN': 'c1921145ad58cf45c78f95f47b9c426a'
      },
      body: JSON.stringify({ lat, lng })
    })
    .then((response) => { return response.json() })
    .then(({checkins}) => {
      dispatch(requestCheckinsSuccess(checkins, { lat, lng }))
      return {
        checkins,
        center: {lat, lng}
      }
    })
    .then((data) => { dispatch(getCheckinsPlaces(data)) })
  }
}

export const PLACES_SUCCESS = 'PLACES_SUCCESS'

function requestPlacesSuccess(places) {
  return { type: PLACES_SUCCESS, places }
}

export function getCheckinsPlaces({checkins, center}) {
  let placeIds = _.chain(checkins).pluck('place_id').uniq().value()
  return function(dispatch) {
    Promise.all(placeIds.map((id) => {
      return fetch(`https://commandp-lbs-backend.herokuapp.com/api/v1/places/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'TOKEN': 'c1921145ad58cf45c78f95f47b9c426a'
        },
      })
      .then((response) => { return response.json() })
      .then(({place}) => { return place })
    })).then((places) => {
      let placesObj = _.zipObject(placeIds, places)
      dispatch(requestPlacesSuccess(placesObj))
      dispatch(getCheckinsPlacesSuccess(center))
    })
  }
}

export const LOCATION_SUCCESS = 'LOCATION_SUCCESS'
export const LOCATION_FAILED  = 'LOCATION_FAILED'

function getGeoLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

export function getUserLocation() {
  return function(dispatch) {
    getGeoLocation()
    .then((position) => {
      let { latitude, longitude } = position.coords
      let location = { lat: latitude, lng: longitude }
      dispatch({
        type: LOCATION_SUCCESS,
        location
      })
      return location
    })
    .then(({lat, lng}) => {
      dispatch(getCheckins(lat, lng))
    })
    .catch((error) => {
      dispatch({
        type: LOCATION_FAILED,
        error
      })
    })
  }
}
