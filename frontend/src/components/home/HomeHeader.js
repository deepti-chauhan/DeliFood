import React from 'react'
import { Link } from 'react-router-dom'
import '../home/styles/HomeHeader.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUtensils,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import SignInButton from '../navbar/SignInButton'
import env from 'react-dotenv'

const HomeHeader = () => {
  const token = localStorage.getItem('token')
  return (
    <div>
      <div className='img-cnt container flex-center'>
        <div className='header-container-1'>
          <div>

          <h1>
           Fresh & Healthy <br/>Food  Delivery  <br/> @ Your Doorstep
          </h1>
          <p>
            The food at your doorwtep. Why starve when you have us. Your hunger
            Partner. Straight out of the oven to your doorstep. we are providing
            the best quality food to your house.
          </p>
          </div>
          <button className='btn order-btn'>
            {token ? (
              <Link to='/menu'>
                ORDER NOW <FontAwesomeIcon icon={faArrowRight}> </FontAwesomeIcon>
              </Link>
            ) : (
              <Link to='/signin'>
                SIGN IN <FontAwesomeIcon icon={faArrowRight}> </FontAwesomeIcon>
              </Link>

              
            )}
          </button>
        </div>
        <img className='header-icon' src={`${env.BASE_URL}/img/route.png`} width='450' />
      </div>
    </div>
  )
}

export default HomeHeader
