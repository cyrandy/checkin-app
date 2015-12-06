import React from 'react'
import FormData from 'react-form-data'

let LoginForm = React.createClass({
  mixins: [ FormData ],
  handleSubmit: function(e) {
    e.preventDefault()
    this.props.onLogin(this.formData)
  },
  render: function() {
    return (
      <form
        onChange={ this.updateFormData }
        onSubmit={ this.handleSubmit }>
        <input type='text' name='username' placeholder='account' />
        <input type='password' name='password' placeholder='password' />
        <input type='submit' value='Login' />
      </form>
    )
  }
})
export default LoginForm
