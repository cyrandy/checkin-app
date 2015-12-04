import fetch from 'isomorphic-fetch'
import _ from 'lodash'

export const CHECKINS_REQUEST = 'CHECKINS_REQUEST'
export const CHECKINS_SUCCESS = 'CHECKINS_SUCCESS'
export const CHECKINS_PLACES_SUCCESS = 'CHECKINS_PLACES_SUCCESS'
export const ADD_CHECKIN_SUCCESS = 'ADD_CHECKIN_SUCCESS'

function requestCheckins() {
  return { type: CHECKINS_REQUEST, isFetching: true }
}

function requestCheckinsSuccess(checkins, center) {
  return { type: CHECKINS_SUCCESS, checkins, center }
}

function getCheckinsPlacesSuccess(center) {
  return { type: CHECKINS_PLACES_SUCCESS, center }
}

function addCheckinSuccess(checkin) {
  return { type: ADD_CHECKIN_SUCCESS, checkin }
}

export function getCheckins(lat = 25.047288, lng = 121.517455) {
  return function (dispatch) {
    dispatch(requestCheckins())
    fetch('https://commandp-lbs-backend.herokuapp.com/api/v1/checkins/neighbor', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'TOKEN': '014a9d66d819e4d52e76c40d0e550c78'
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
export const ADD_PLACE_SUCCESS = 'ADD_PLACE_SUCCESS'

function requestPlacesSuccess(places) {
  return { type: PLACES_SUCCESS, places }
}

function addPlaceSuccess(place) {
  return { type: ADD_PLACE_SUCCESS, place }
}

export function getCheckinsPlaces({checkins, center}) {
  let placeIds = _.chain(checkins).pluck('place_id').uniq().value()
  return function(dispatch) {
    Promise.all(placeIds.map((id) => {
      return fetch(`https://commandp-lbs-backend.herokuapp.com/api/v1/places/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'TOKEN': '014a9d66d819e4d52e76c40d0e550c78'
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

export function postCheckin(data) {
  return function(dispatch) {
    fetch(`https://commandp-lbs-backend.herokuapp.com/api/v1/places`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'TOKEN': '014a9d66d819e4d52e76c40d0e550c78'
      },
      method: 'post',
      body: JSON.stringify({
        name: data.name,
        lat: data.lat,
        lng: data.lng
      })
    })
    .then((response) => { return response.json() })
    .then(({place}) => {
      dispatch(addPlaceSuccess(place))
      return place
    })
    .then((place) => {
      return fetch(`https://commandp-lbs-backend.herokuapp.com/api/v1/checkins`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'TOKEN': '014a9d66d819e4d52e76c40d0e550c78'
        },
        method: 'post',
        body: JSON.stringify({
          place_id: place.id,
          comment: data.comment
        })
      })
    })
    .then((response) => { return response.json() })
    .then(({checkin}) => { console.log(checkin) })
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
