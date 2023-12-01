import React, { useEffect } from 'react'
import Footer from '../components/shared/Footer'
import AboutHeader from '../components/about/AboutHeader'
import AboutMain from '../components/about/AboutMain'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import Popular from '../components/shared/Popular'
import Servicecard from '../components/shared/ServiceCard'
import { scrollToBottom, scrollToTop } from '../Util/scroll'

const About = () => {

  return (
    <div>
      <AboutHeader />
       <Popular />
      <AboutMain />
      <Servicecard />
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
