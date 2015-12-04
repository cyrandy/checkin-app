import React from 'react'
import { connect } from 'react-redux'
import { getUserLocation, getCheckins } from '../../actions'
import CheckinMap from '../../components/Map'
import CheckinList from '../../components/CheckinList'

let CheckinPage = React.createClass({
  getDefaultProps: function() {
    return {
      geolocation: { lat: undefined, lng: undefined },
      checkins: { items: [] }
    }
  },
  componentDidMount: function() {
    this.props.dispatch(getUserLocation())
    this.props.dispatch(getCheckins())
  },
  render: function() {
    let mapComponent
    if (!this.props.checkins.waitingPlaces
        &&
        this.props.checkins.items.length
      ) {
      mapComponent = (
        <CheckinMap
          center={ this.props.geolocation }
          {...this.props.places} />
      )
    } else {
      mapComponent = (<CheckinMap
        center={ this.props.geolocation } />)
    }

    return (
      <div className='c-checkin-page'>
        <CheckinMap
          {...this.props} />
        <CheckinList {...this.props} />
      </div>
    )
  }
})

function select(state) {
  let { geolocation, checkins, places } = state
  return { geolocation, checkins, places }
}
export default connect(select)(CheckinPage)
export { CheckinPage }
