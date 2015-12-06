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
  handleFileSelect: function(e) {
    e.stopPropagation()
    let file = e.target.files[0]
    if (!file.type.match('image.*')) {
      return
    }

    let reader = new FileReader()
    reader.onload = (e) => {
      this.setFormData('photo', e.target.result)
    }

    reader.readAsDataURL(file)
  },
  render: function() {
    return (
      <form
        className='c-checkin-page__content'
        onChange={this.updateFormData}
        onSubmit={ this.handleSubmit }>
        <div>
          <label htmlFor='name' ref='placeName'>地點</label>
          <input type='text' name='name' />
        </div>
        <div>
          <label htmlFor='comment'>留言</label>
          <input type='text' name='comment' ref='comment' />
        </div>
        <div>
          <label htmlFor='comment'>照片</label>
          <input type='file' name='avatar' accept='image/jpeg,image/png' onChange={ this.handleFileSelect }/>
        </div>
        <div>
          <input type='submit' value='Check In' />
        </div>
      </form>
    )
  }
})
export default AddCheckin
