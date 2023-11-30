import React from 'react'
import Footer from '../components/shared/Footer'
import HomeHeader from '../components/home/HomeHeader'
import Popular from '../components/shared/Popular'
import Service from '../components/home/Service'
import Servicecard from '../components/shared/ServiceCard'

function Home() {
  return (
    <div>
      <HomeHeader />
      <Popular/>
      <Service/>
      <Servicecard/>
    <Footer />
    </div>
  )
}

export default Home
