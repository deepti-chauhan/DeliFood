import React from 'react'
import env from 'react-dotenv'
import './styles/service.css'

const Service = () => {
  return (
    <div className='main-service-container flex-center'>
      {/* header */}
      <div className='service-header'>
        <h1 className='service-header'>
          Wait a minute for <br/>delicious <span><b>food</b></span>
        </h1>
      </div>

      {/* service card */}
      <div className='service-wrapper flex-sb'>
        <div className='service-container-box'>
          <div className='flex-center'>
            {/* <img src={`${env.BASE_URL}/img/checklist.png`} /> */}
            <img src='../assets/checklist.png'/>
          </div>
          <h3>Easy to Order</h3>
          <p>
            A Restaurant controlled online food ordering, the Restaurant Aenean
            magna urna, hendrerit tristique laoreet nec, ultricies et felis.
            Phasellus fringilla velit eros, vel congue quam elementum eget.
            Quisque congue tellus sed magna mattis, in tincidunt urna euismod.
          </p>
        </div>
        <div className='service-container-box'>
          <div className='flex-center'>
            {/* <img src={`${env.BASE_URL}/img/map.png`} /> */}
            <img src='../assets/map.png'/>
          </div>
          <h3>Live Order</h3>
          <p>
            In addition to paying for the food, customers will often pay, Aenean
            magna urna, hendrerit tristique laoreet nec, ultricies et felis.
            Phasellus fringilla velit eros, vel congue quam elementum eget.
            Quisque congue tellus sed magna mattis, in tincidunt urna euismod.
          </p>
        </div>
        <div className='service-container-box'>
          <div className='flex-center'>
            {/* <img src={`${env.BASE_URL}/img/pizza (1).png`} /> */}
            <img src='../assets/pizza (1).png'/>
          </div>
          <h3>Best Quality</h3>
          <p>
            Food delivery companies will delivery food, pre-prep meals,
            vegetables, Aenean magna urna, hendrerit tristique laoreet nec,
            ultricies et felis. Phasellus fringilla velit eros, vel congue quam
            elementum eget. Quisque congue tellus sed magna mattis, in tincidunt
            urna euismod.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Service
