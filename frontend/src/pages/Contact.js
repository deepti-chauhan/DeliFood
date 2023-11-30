import React from 'react'
import Footer from '../components/shared/Footer'
import '../style/contact.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationDot,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons'
import ContactCard from '../components/shared/ContactCard'

const Contact = () => {
  return (
    <div>
      <ContactCard/>
      {/* <div className='contact-container container flex-center'>
        <div className='contact-info'>
            <h1>Contact Us</h1>
            <div className='flex-sa'>
              <span className='info-box'>
                <span>
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>
                <h2>Address</h2>
                <p>
                  John Doe 123 <br />
                  Main Street Cityville, <br />
                  State 12345 <br />
                  Country
                </p>
              </span>
              <span className='info-box'>
                <span>
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <h2>Email Us</h2>
                <p>contact@deliFood.com</p>
                <p>support@gmail.com</p>
              </span>
              <span className='info-box'>
                <span>
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <h2>Call Us</h2>
                <p>+91 1231234563</p>
                <p>+91 1231234563</p>
              </span>
            </div>
        </div>
      </div> */}
      <Footer />
    </div>
  )
}

export default Contact
