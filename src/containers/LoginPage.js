import React from 'react'
import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'

let LoginPage = React.createClass({
  render: function() {
    return (
      <div>
        <LoginForm />
      </div>
    )
  }
})

export default connect()(LoginPage)
export { LoginPage }
