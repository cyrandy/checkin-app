import React from 'react'
import _ from 'lodash'
import { GoogleMap, Marker, InfoWindow, GoogleMapLoader } from 'react-google-maps'
let CheckinMap = React.createClass({
  componentWillUpdate: function(props, state) {
    if (this.refs.map) {
      this.refs.map.props.map.setCenter(props.center)
    }
  },
  handleMapClick: function() { return },
  render: function() {
    let markers = _.map(this.props.places, (place) => {
      return {
        position: {lat: place.lat, lng: place.lng},
        key: place.id,
        defaultAnimation: 2
      }
    })
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
            defaultCenter={this.props.center}
            onClick={this.handleMapClick}>
            {
              markers.map((marker) => {
                return (
                  <Marker {...marker} />
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
