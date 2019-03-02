import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {initUser} from './action/user'

import reducer from './reducer'
import App from './App'

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

if (!window.location.href.includes('login')) {
  store.dispatch(initUser())
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
    document.getElementById('root'))
