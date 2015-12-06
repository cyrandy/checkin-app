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
        className='c-login-form'
        onChange={ this.updateFormData }
        onSubmit={ this.handleSubmit }>
        <input className='c-login-form__input' type='text' name='username' placeholder='account' />
        <input className='c-login-form__input' type='password' name='password' placeholder='password' />
        <input className='c-login-form__input' type='submit' value='Login' />
      </form>
    )
  }
})
export default LoginForm
