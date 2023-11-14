import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Footer from '../components/shared/Footer'
import env from 'react-dotenv'
import { FaEye } from 'react-icons/fa'

const initialState = {
  email: '',
  password: '',
}

const Signin = () => {
  const [userData, setUserData] = useState(initialState)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm()

  const onHandleChange = (e) => {
    e.preventDefault()
    console.log('handle event..')
    // console.log(e.target.email)
    // console.log(e.target.name)
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }
  const onSubmit = async () => {
    console.log('signed in')
    // e.preventDefault()
    const { email, password } = userData
    console.log(userData)
    console.log('logging in >>>')

    const currentUser = { email, password }
    console.log(currentUser)

    loginUser(currentUser)
  }

  const loginUser = async (currentUser) => {
    try {
      const response = await fetch(`${env.BASE_URL}/api/user/login`, {
        method: 'POST',
        body: JSON.stringify(currentUser),
        headers: { 'Content-type': 'application/json' },
      })
      const { user, token } = await response.json()
      // console.log(message)

      addUserToLocalStorage({ user, token })
      if (user) {
        navigate(location.state?.from?.pathname || '/')
        console.log(location.state?.from?.pathname)
        window.location.reload()
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <div className='container flex-center'>
        <div className='form-container flex-center'>
          <h2>Log In</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-control-container'>
              <div className='form-control'>
                <div className='error'>
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
                <label className='label'>Email</label>
                <input
                  className='input'
                  type='text'
                  name='email'
                  {...register('email', {
                    required: 'Email is required!!',
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: 'Email is not valid',
                    },
                  })}
                  value={userData.email}
                  onChange={onHandleChange}
                />
              </div>
              <div className='form-control' id='password-input'>
                <div className='error'>
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
                <label>Password</label>
                <input
                  className='input'
                  id='input'
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  {...register('password', {
                    required: 'Password is required!!',
                    minLength: {
                      value: 8,
                      message: 'Password should be at-least 8 characters.',
                    },
                  })}
                  value={userData.password}
                  onChange={onHandleChange}
                />
                <div className='password-eye'>
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                </div>
              </div>
              <div className='form-control'>
                <button type='submit' className='btn form-btn'>
                  Login
                </button>
                <p className='forget-password'>Forget Password</p>
              </div>
            </div>
          </form>
          <p>
            Don't have Account
            <Link to='/signup' state={{ from: location.pathname }}>
              Create One
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Signin
