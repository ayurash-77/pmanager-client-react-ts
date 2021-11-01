import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import App from './app/App'
import { setupStore } from './store/store'
import './translations/i18n'

const store = setupStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
)
