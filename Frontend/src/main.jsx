import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './App/Store.js'
import { AppProvider } from './context/productContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
    <Provider store={store}>
      <App/>
  </Provider>
  </AppProvider>
 </React.StrictMode>,
)
