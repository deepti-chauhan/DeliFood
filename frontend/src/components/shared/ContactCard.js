import React from 'react'
import env from 'react-dotenv'
import '../home/styles/service.css'

const ContactCard = () => {
  return (
    <div className='container contact-container'>
      <div className='main-service-container flex-center'>
        {/* header */}
        <div className='service-header'>
          <h1 className='service-header'>
            Contact{' '}
            <span>
              <b>Us</b>
            </span>
          </h1>
        </div>

        {/* service card */}
        <div className='service-wrapper flex-sb'>
          <div className='service-container-box'>
            <div className='flex-center'>
              {/* <img src={`${env.BASE_URL}/img/email.png`} /> */}
              <img src={`./assets/email.png`} />
            </div>
            <h3>Contact Us</h3>
            <p>
              
            </p>
            <p className='contact-footer'>
              support@DeliFood.com <br />
              contact.deliFood@gmail.com
            </p>
          </div>
          <div className='service-container-box'>
            <div className='flex-center'>
              {/* <img src={`${env.BASE_URL}/img/address.png`} /> */}
              <img src={`./assets/address.png`} />
            </div>
            <h3>Visit Us</h3>
            <p>
             
            </p>
            <p className='contact-footer'>
              123 Main Street,
              <br />
              Cityville, Stateland, Zip Code: 12345,
              <br />
              Country: Imaginaria
            </p>
          </div>
          <div className='service-container-box'>
            <div className='flex-center'>
              {/* <img src={`${env.BASE_URL}/img/phone.png`} /> */}
              <img src={`./assets/phone.png`} />
            </div>
            <h3>Call Us</h3>
            <p>
              
            </p>
            <p className='contact-footer'>
              (555) 555-5555 <br />
              (555) 123-4567
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactCard
