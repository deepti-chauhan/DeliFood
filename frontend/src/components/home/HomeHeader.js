
import {  useNavigate } from 'react-router-dom'
import '../home/styles/HomeHeader.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const HomeHeader = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className='img-cnt container flex-center'>
        <div className='header-container-1 flex-center'>
          <div>
            <h1>
              Fresh & Healthy <br />
              Food Delivery <br /> @ Your Doorstep
            </h1>
            <p>
              The food at your doorwtep. Why starve when you have us. Your
              hunger Partner. Straight out of the oven to your doorstep. we are
              providing the best quality food to your house.
            </p>
          </div>
          <button
            className='btn order-btn'
            onClick={() => {
              navigate('/menu')
            }}
          >
            ORDER NOW <FontAwesomeIcon icon={faArrowRight}> </FontAwesomeIcon>
          </button>
        </div>
        {/* <img className='header-icon' src={`${env.BASE_URL}/img/route.png`} width='450' /> */}
        {/* <img className='header-icon' src='./assets/route.png' width='450' /> */}
      </div>
    </>
  )
}

export default HomeHeader
