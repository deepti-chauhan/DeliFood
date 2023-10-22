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
  const scrollToBottom = () => {
    console.log('button clicked for scroll down')
    window.scrollBy(0, 675)
  }
  return (
    <>
      <div className='container about-header flex-center'>
        <h1 className='about-title'>DeliFooD</h1>
        <p className='about-text'>
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
        <div className='about-scroll-down'>
          <FaArrowDown onClick={scrollToBottom} />
        </div>
      </div>
    </>
  )
}

export default AboutHeader
