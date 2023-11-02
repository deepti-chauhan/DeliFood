import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Footer from '../components/shared/Footer'

const initialState = {
  email: '',
  password: '',
}

const Signin = () => {
  const [userData, setUserData] = useState(initialState)
  const [error, setError] = useState('')

  const navigate = useNavigate()

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
      const response = await fetch(`http://localhost:8080/api/user/login`, {
        method: 'POST',
        body: JSON.stringify(currentUser),
        headers: { 'Content-type': 'application/json' },
      })
      const { user, token } = await  response.json()
      addUserToLocalStorage({ user, token })
      if (user) {
        navigate('/')
        window.location.reload();
      }
    } catch (e) {
      setError(e.response.json())
      console.log(error)
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
                <label>Email</label>
                <input
                  className='input'
                  type='text'
                  name='email'
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: 'Email is not valid',
                    },
                  })}
                    value = {userData.email}
                  onChange = {onHandleChange}
                />

                {errors.email && (
                  <p className='errorMsg'>{errors.email.message}</p>
                )}
              </div>
              <div className='form-control'>
                <label>Password</label>
                <input
                  className='input'
                  type='password'
                  name='password'
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password should be at-least 6 characters.',
                    },
                  })}
                  value = {userData.password}
                  onChange={onHandleChange}
                />
                {errors.password && (
                  <p className='errorMsg'>{errors.password.message}</p>
                )}
              </div>
              <div className='form-control'>
                <button type='submit' className='btn form-btn'>
                  Login
                </button>
              </div>
            </div>
          </form>
          <p>
            Don't have Account
            <Link to={'/signup'}>Create One</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Signin
