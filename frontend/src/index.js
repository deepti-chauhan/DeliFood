import React from 'react'
import ReactDOM from 'react-dom/client'

// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";


import './index.css'
// import './styles.css'
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
    {/* <Provider store={store} /> */}
  </React.StrictMode>
)
reportWebVitals()
