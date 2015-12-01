import CheckinMap from '../../components/Map'
import CheckinList from '../../components/CheckinList'

let CheckinPage = React.createClass({
  getInitialState: function() {
    return {
      markers: [
        {
          position: {
            lat: 25.0258386,
            lng: 121.4682614
          },
          defaultAnimation: 2
        },
        {
          position: {
            lat: 25.0555118557155,
            lng: 121.544644832611
          },
          defaultAnimation: 2
        }
      ]
    }
  },
  render: function() {
    return (
      <div className='c-checkin-page'>
        <CheckinMap {...this.state} />
        <CheckinList {...this.state} />
      </div>
    )
  }
})

export default CheckinPage
