import Layout from '../components/routes/Layout'
import PrivateRoute from '../components/routes/PrivateRoute'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Home from '../pages/Home'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'

const publicRoutes = () => {
  return {
    elememnt: <Layout />,
    children: [
      { path: '/', elememnt: <Home /> },
      { path: '/about', elememnt: <About /> },
      { path: '/contact', elememnt: <Contact /> },
      { path: '/signin', elememnt: <Signin /> },
      { path: '/signup', elememnt: <Signup /> },
      { path: '/*', elememnt: <PrivateRoute /> },
    ],
  }
}

export default publicRoutes
