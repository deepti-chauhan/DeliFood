import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Footer from '../components/shared/Footer'
import env from 'react-dotenv'
import { FaEye } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { Oval } from 'react-loader-spinner'

const initialState = {
  email: '',
  password: '',
}

const Signin = () => {
  const [userData, setUserData] = useState(initialState)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm()

  const onHandleChange = (e) => {
    e.preventDefault()
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }

  const onSubmit = async () => {
    // e.preventDefault()
    const { email, password } = userData
    const currentUser = { email, password }
    loginUser(currentUser)
  }

  const loginUser = async (currentUser) => {
    setLoading(true)
    try {
      const response = await fetch(`${env.BASE_URL}/api/user/login`, {
        method: 'POST',
        body: JSON.stringify(currentUser),
        headers: { 'Content-type': 'application/json' },
      })

      if (!response.ok) {
        // Handle non-successful responses (e.g., 404 Not Found, 500 Internal Server Error)
        throw new Error(`Failed to log in. Status: ${response.status}`)
      }

      const { user, token } = await response.json()
      addUserToLocalStorage({ user, token })

      if (user) {
        navigate(location.state?.from?.pathname || '/')
        window.location.reload()
      }
      Swal.fire({
        title: 'Success!',
        text: 'Login successful',
        icon: 'success',
        button: 'OK',
      })
    } catch (error) {
      console.error('Error logging in:', error.message)
      Swal.fire({
        title: 'Login Failed',
        text: 'Incorrect login credentials',
        icon: 'error',
        button: 'OK',
      })
    } finally {
      setLoading(false)
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
                      message: 'incorrect password',
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
                {loading ? (
                <div className='flex-center'>
                  <Oval
                    height={30}
                    width={30}
                    color='#efefef'
                    wrapperStyle={{}}
                    wrapperClass=''
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor='#00000d'
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                </div>
              ) : 'Login'}
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
