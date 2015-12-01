import { GoogleMap, Marker, InfoWindow, GoogleMapLoader } from 'react-google-maps'
let CheckinMap = React.createClass({
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
            defaultCenter={{lat: 25.0497133, lng: 121.516291}}
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
