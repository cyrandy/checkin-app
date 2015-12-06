import React from 'react'
import { connect } from 'react-redux'
import RegisterForm from '../components/RegisterForm'
import { register } from '../actions'

let RegisterPage = React.createClass({
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
  handleRegisterRequest: function(data) {
    this.props.dispatch(register({user: data}))
  },
  render: function() {
    return (
      <div>
        <RegisterForm onRegister={ this.handleRegisterRequest } />
      </div>
    )
  }
})
function select({login}) {
  return {login}
}
export default connect(select)(RegisterPage)
export { RegisterPage }
