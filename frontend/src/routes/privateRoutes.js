import { Navigate } from 'react-router-dom'
import Layout from '../components/routes/Layout'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Profile from '../pages/Profile'
import Payments from '../pages/Payments'

const privateRoutes = () => {
  return {
    element: <Layout />,
    children: [
      { path: '/cart', element: <Cart /> },
      { path: '/cart/checkout', element: <Checkout /> },
      { path: '/profile', element: <Profile /> },
      { path: '/payments', element: <Payments /> },
      { path: '*', element: <Navigate to='/' replace /> },
    ],
  }
}

export default privateRoutes
