let geolocation = {
  use: function() {
    this.nativeGetCurrentPosition = function() {}
  },
  sendPosition: function({lat, lng}) {
    if( this.nativeGetCurrentPosition ) {
      navigator.geolocation.getCurrentPosition = (success, error) => {
        success({
          coords: { latitude: lat, longitude: lng }
        })
      }
    }
  },
  shouldFailed: function(err) {
    if( this.nativeGetCurrentPosition ) {
      navigator.geolocation.getCurrentPosition = (success, error) => {
        error(err)
      }
    }
  },
  restore: function() {
    navigator.geolocation.getCurrentPosition = this.nativeGetCurrentPosition
    this.nativeGetCurrentPosition = null
  }
}

export default geolocation
