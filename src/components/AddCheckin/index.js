import React from 'react'
import FormData from 'react-form-data'
import { postCheckin } from '../../actions'

let AddCheckin = React.createClass({
  mixins: [ FormData ],
  getInitialFormData: function () {
    let { geolocation } = this.props
    return {
      lat: geolocation.lat,
      lng: geolocation.lng
    }
  },
  componentWillReceiveProps: function(props) {
    if(props.checkins.addCheckinSuccess) {
      props.history.push('/checkins')
    }
  },
  handleSubmit: function(e) {
    e.preventDefault()
    this.props.dispatch(postCheckin(this.formData))
  },
  render: function() {
    return (
      <form
        className='c-checkin-page__content'
        onChange={this.updateFormData}
        onSubmit={ this.handleSubmit }>
        <label htmlFor='name' ref='placeName'>地點</label>
        <input type='text' name='name' />
        <label htmlFor='comment'>留言</label>
        <input type='text' name='comment' ref='comment' />
        <input type='submit' value='Check In' />
      </form>
    )
  }
})
export default AddCheckin
