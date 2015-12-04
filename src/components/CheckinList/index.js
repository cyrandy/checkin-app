import React from 'react'
import { Link } from 'react-router'

let CheckinListItem = React.createClass({
  render: function() {
    return (
      <li className='c-checkin-list__item'>
        xxx 在 {this.props.placeName} 說：
        <br />
        { this.props.comment }
      </li>
    )
  }
})
let CheckinList = React.createClass({
  render: function() {
    return (
      <ul className='c-checkin-list'>
        {this.props.checkins.items.map((checkin, index) => {
          let placeName =  ''
          if(!this.props.checkins.waitingPlaces) {
            placeName = this.props.places[checkin.place_id].name
          }
          return (
            <CheckinListItem {...checkin} placeName={placeName} key={index} />
          )
        })}
        <Link to='/checkins/add'>ADD</Link>
      </ul>
    )
  }
})
export default CheckinList
