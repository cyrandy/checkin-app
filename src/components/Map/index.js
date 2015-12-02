import React from 'react'
import { GoogleMap, Marker, InfoWindow, GoogleMapLoader } from 'react-google-maps'
let CheckinMap = React.createClass({
  componentWillUpdate: function(props, state) {
    this.refs.map.props.map.setCenter(props.center)
  },
  handleMapClick: function() { return },
  render: function() {
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
            {this.props.markers.map((marker, index) => {
              return (
                <Marker {...marker} key={`marker_${index}`}>
                  <InfoWindow>
                    <div>
                      <strong>marker {index}</strong>
                    </div>
                  </InfoWindow>
                </Marker>
              );
            })}
          </GoogleMap>
        }
      />
    )
  }
})

export default CheckinMap
