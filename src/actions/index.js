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
      dispatch({
        type: LOCATION_SUCCESS,
        location: { lat: latitude, lng: longitude }
      })
    })
    .catch((error) => {
      dispatch({
        type: LOCATION_FAILED,
        error
      })
    })
  }
}
