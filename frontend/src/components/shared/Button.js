import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ redirectTo, name, onClick, icon }) => {
  return (
    <Link to={`/${redirectTo}`}>
      <button onClick={onClick} className='btn btn-primary'>
        {name} {icon}
      </button>
    </Link>
  )
}

export default Button
