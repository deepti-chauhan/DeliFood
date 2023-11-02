import { Navigate } from 'react-router-dom'
import Layout from '../components/routes/Layout'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Profile from '../pages/Profile'

const privateRoutes = () => {
  return {
    element: <Layout />,
    children: [
      { path: '/cart', element: <Cart /> },
      { path: '/cart/checkout', element: <Checkout /> },
      { path: '/profile', element: <Profile /> },
      { path: '*', element: <Navigate to='/' replace /> },
    ],
  }
}

export default privateRoutes
