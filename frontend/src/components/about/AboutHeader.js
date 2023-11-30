import React from 'react'
import './AboutHeader.css'
import {
  FaArrowDown,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa'

const AboutHeader = () => {
 
  return (
    <>
      <div className=' about-header flex-center'>
        <h1>DeliFooD</h1>
        <h3>Fresh & Healthy Food at Your DoorStep</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries,{' '}
        </p>
        <div className='about-icons flex-sa'>
          <a href='#'>
            <FaFacebook />
          </a>
          <a href='#'>
            <FaInstagram />
          </a>
          <a href='#'>
            <FaTwitter />
          </a>
          <a href='#'>
            <FaGithub />
          </a>
        </div>
       
      </div>
    </>
  )
}

export default AboutHeader
