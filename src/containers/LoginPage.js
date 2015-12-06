import React from 'react'
import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { login } from '../actions'

let LoginPage = React.createClass({
  handleLoginRequest: function(user) {
    this.props.dispatch(login(user))
  },
  render: function() {
    return (
      <div>
        <LoginForm onLogin={ this.handleLoginRequest } />
      </div>
    )
  }
})

export default connect()(LoginPage)
export { LoginPage }
