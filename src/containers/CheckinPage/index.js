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
    return (
      <div className='c-checkin-page'>
        <CheckinMap {...this.state}
          center={ this.props.geolocation }
          markers={ this.props.checkins.items } />
        <CheckinList {...this.state} markers={ this.props.checkins.items } />
      </div>
    )
  }
})

function select(state) {
  let { geolocation, checkins } = state
  return { geolocation, checkins }
}
export default connect(select)(CheckinPage)
export { CheckinPage }
