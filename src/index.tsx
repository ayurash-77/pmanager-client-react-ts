import { setupListeners } from '@reduxjs/toolkit/query'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './app/App'
import { setupStore } from './store/store'
import './translations/i18n'

const store = setupStore()

setupListeners(store.dispatch)

const container = document.getElementById('root')

// REACT 17

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   container
// )

// REACT 18

const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
)
