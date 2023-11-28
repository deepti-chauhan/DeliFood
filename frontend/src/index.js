import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { CartProvider } from './store/CartProvider'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>

    <Provider store={store}></Provider>
  </React.StrictMode>
)
reportWebVitals()
