import { Navigate } from 'react-router-dom'
import Layout from '../components/routes/Layout'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Profile from '../pages/Profile'
import Success from '../pages/Success'
import Cancel from '../pages/Cancel'

const privateRoutes = () => {
  return {
    element: <Layout />,
    children: [
      { path: '/cart', element: <Cart /> },
      { path: '/cart/checkout', element: <Checkout /> },
      { path: '/profile', element: <Profile /> },
      { path: '/success', element: <Success /> },
      { path: '/cancel', element: <Cancel /> },
      { path: '*', element: <Navigate to='/' replace /> },
    ],
  }
}

export default privateRoutes
