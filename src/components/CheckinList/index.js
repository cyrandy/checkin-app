let CheckinListItem = React.createClass({
  render: function() {
    return (
      <li>{ this.props.index }</li>
    )
  }
})
let CheckinList = React.createClass({
  render: function() {
    return (
      <ul className='c-checkin-list'>
        {this.props.markers.map((marker, index) => {
          return (
            <CheckinListItem {...marker} index={index} key={index} />
          )
        })}
      </ul>
    )
  }
})
export default CheckinList
