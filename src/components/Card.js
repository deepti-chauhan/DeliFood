import React from 'react'
import { Link } from 'react-router-dom'

const Card = (props) => {
  return (
    <div className='card flex'>
      <img className='card-title' src={props.image} width='150px' />
      <div className='card-title'>{props.name}</div>
      <div className='card-title'>${props.price}</div>
      <button className='btn main-btn'>
        <Link to='/cart'>Add Items To cart</Link>
      </button>
    </div>
  )
}

export default Card
