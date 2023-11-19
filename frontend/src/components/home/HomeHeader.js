import React from 'react'
import { Link } from 'react-router-dom'
import '../home/styles/HomeHeader.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faRoute } from '@fortawesome/free-solid-svg-icons'

const HomeHeader = () => {
  return (
    <div>
      <div className='container flex-center'>
        <div className='main-header-container flex-sa'>
          <div className='header-text flex-se'>
            <h1>
              Fresh & <br /> Healthy Food
            </h1>
            <p>
              Relax please, we've got you
              <br />
              covered every day of the week
              
            </p>

            <Link to='/menu' className='link'>
              <button className='btn'>Discover menu
              </button>
            </Link>
          </div>
          <div className='header-img flex-center'>
              {/* <FontAwesomeIcon icon={faRoute} id='map-icon'/> */}
            <img src='./assets/route.png' width='350' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeHeader
