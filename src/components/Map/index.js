import React from 'react'
import _ from 'lodash'
import { GoogleMap, Marker, InfoWindow, GoogleMapLoader } from 'react-google-maps'
let CheckinMap = React.createClass({
  componentWillUpdate: function(props, state) {
    if (this.refs.map) {
      this.refs.map.props.map.setCenter(props.geolocation)
    }
  },
  handleMapClick: function() { return },
  render: function() {
    let markers = []
    if (!this.props.checkins.waitingPlaces) {
      let placeIds = _.chain(this.props.checkins.items)
        .pluck('place_id')
        .uniq()
        .value()

      markers = placeIds.map((id) => {
        let place = this.props.places[id]
        return {
          position: {lat: place.lat, lng: place.lng},
          key: place.id,
          defaultAnimation: 2
        }
      })
    }

    return (
      <GoogleMapLoader
        containerElement={
          <div
            {...this.props}
            style={{
              height: "100%",
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            ref='map'
            defaultZoom={13}
            defaultCenter={this.props.geolocation}
            onClick={this.handleMapClick}>
            {
              markers.map((marker) => {
                return (
                  <Marker {...marker} key={marker.key} />
                )
              })
            }
          </GoogleMap>
        }
      />
    )
  }
})

export default CheckinMap
