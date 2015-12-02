import './index.sass'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import checkinApp from './reducers'

import CheckinPage from './containers/CheckinPage'

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
let store                     = createStoreWithMiddleware(checkinApp)

ReactDOM.render(
  <Provider store={ store }>
    <CheckinPage />
  </Provider>,
  document.getElementById('content')
)
