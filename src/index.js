import './index.sass'
import { render } from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import checkinApp from './reducers'

import CheckinPage from './containers/CheckinPage'
import CheckinList from './components/CheckinList'
import AddCheckin from './components/AddCheckin'
import LoginPage from './containers/LoginPage'

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
let store                     = createStoreWithMiddleware(checkinApp)

render(
  <Provider store={ store }>
    <Router>
      <Route path="/login" component={LoginPage} />
      <Route path="/checkins" component={CheckinPage}>
        <IndexRoute component={CheckinList} />
        <Route path="add" component={AddCheckin} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('content')
)
