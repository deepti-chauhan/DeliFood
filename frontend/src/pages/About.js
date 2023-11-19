import React from 'react'
import Footer from '../components/shared/Footer'
import AboutHeader from '../components/about/AboutHeader'
import AboutMain from '../components/about/AboutMain'
import AboutImages from '../components/about/AboutImages'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import AboutMain2 from '../components/about/AboutMain2'

const About = () => {
  const scrollToBottom = () => {
    window.scrollTo({
      top: 5000,
      behavior: 'smooth',
    })
  }
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }
  return (
    <div>
      <AboutHeader />
      <AboutMain />
      {/* <AboutImages /> */}
      <div className='about-scroll-down flex-sb'>
        <div className='flex-center' onClick={scrollToTop}>
          <FaArrowUp />
        </div>
        <div className='flex-center' onClick={scrollToBottom}>
          <FaArrowDown />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About
