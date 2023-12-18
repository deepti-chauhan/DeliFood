import Layout from '../components/routes/Layout'
import PrivateRoute from '../components/routes/PrivateRoute'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Home from '../pages/Home'
import Menu from '../pages/Menu'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'
import EmailVerify from '../pages/EmailVerify'


const publicRoutes = () => {
  return {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/menu', element: <Menu /> },
      { path: '/contact', element: <Contact /> },
      { path: '/signin', element: <Signin /> },
      { path: '/signup', element: <Signup /> },
      { path: '/:userId/verify/:token', element: <EmailVerify /> },
      { path: '/*', element: <PrivateRoute /> },
    ],
  }
}

export default publicRoutes
