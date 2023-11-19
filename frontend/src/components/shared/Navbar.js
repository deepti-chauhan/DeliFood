import React, { useEffect, useState } from 'react'
import Button from './Button'
import '../styles/Navbar.css'
import { FaSignInAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import CartButton from '../cart/CartButton'
import LoggedInButton from '../navbar/LoggedInButton'
import SignInButton from '../navbar/SignInButton'

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
      <div className='nav-icon flex-center'>
        <h2>
          <Link to='/'>DeliFooD</Link>
        </h2>
      </div>
      <div className='nav-menu flex-se'>
        <div className='nav-list flex-se'>
          <Link to='/'>Home</Link>
          <Link to='/about'>About Us</Link>
          <Link to='/menu'>Menu</Link>
          <Link to='/contact'>Contact</Link>
        </div>

        <div className='nav-btn flex'>
          {isLoggedIn ? <LoggedInButton name={username} /> : <SignInButton />}

          <CartButton />
        </div>
      </div>
    </div>
  )
}

export default Navbar
