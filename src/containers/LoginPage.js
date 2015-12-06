import React from 'react'
import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { login } from '../actions'

let LoginPage = React.createClass({
  componentWillMount: function() {
    this.handleIsLogin(this.props.login.loginSuccess)
  },
  componentWillReceiveProps: function(props) {
    this.handleIsLogin(props.login.loginSuccess)
  },
  handleIsLogin: function(isLogin) {
    if(isLogin) {
      this.props.history.replace('/checkins')
    }
  },
  handleLoginRequest: function(user) {
    this.props.dispatch(login(user))
  },
  render: function() {
    return (
      <div className='c-login-form-container'>
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
