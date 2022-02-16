import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './app/App'
import { setupStore } from './store/store'
import './translations/i18n'
import { setupListeners } from '@reduxjs/toolkit/query'

const store = setupStore()

setupListeners(store.dispatch)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
)
