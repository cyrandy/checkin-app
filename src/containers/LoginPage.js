import React from 'react'
import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { login } from '../actions'

let LoginPage = React.createClass({
  componentWillReceiveProps: function(props) {
    if(props.login.loginSuccess) {
      this.props.history.replace('/checkins')
    }
  },
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

function select({login}) {
  return {login}
}
export default connect(select)(LoginPage)
export { LoginPage }
