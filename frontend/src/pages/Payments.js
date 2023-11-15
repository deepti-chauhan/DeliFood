import React from 'react'
import { Link } from 'react-router-dom'

const Payments = (props) => {
  return (
    <div className='container payment-container'>
        <p>Payments Page</p>
        <Link to='/cart'>
        <button className='btn main-btn'>GO BACK TO CART</button>
        </Link>
        </div>
  )
}

export default Payments