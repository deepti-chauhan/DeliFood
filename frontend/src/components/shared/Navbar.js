import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CartButton from '../cart/CartButton'
import LoggedInButton from '../navbar/LoggedInButton'
import SignInButton from '../navbar/SignInButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import '../styles/Navbar.css'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    const currentToken = localStorage.getItem('token')
    if (currentToken) {
      const { username } = JSON.parse(localStorage.getItem('user'))
      setIsLoggedIn(true)
      setUsername(username)
    }
  }, [])

  return (
    <div className='navbar flex-sb'>

      <div className='nav-menu'>
        <div className='nav-list flex-se'>
          <Link className='link link-hover' to='/'>HOME</Link>
          <Link className='link link-hover' to='/about'>ABOUT</Link>
          <Link className='link link-hover' to='/menu'>MENU</Link>
          <Link className='link link-hover' to='/contact'>CONTACT</Link>
        </div>
      </div>

      <div className='nav-logo flex-center'>
        <h2>
          <Link to='/' className='link'>
            {' '}
            <FontAwesomeIcon icon={faUtensils} /> Deli<b>FooD</b>{' '}
          </Link>
        </h2>
      </div>


      <div className='nav-icons flex-center'>
        {isLoggedIn ? <LoggedInButton name={username} /> : <SignInButton />}
        <CartButton />
      </div>

    </div>
  )
}

export default Navbar
