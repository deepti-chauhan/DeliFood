import React from 'react'
import Footer from '../components/shared/Footer'

const Contact = () => {
  return (
    <div>
      <div className='contact-container container flex-center'>
        <div className='contact-info flex-center'>
          <div className='contact-div flex-center'>
            <h2>Contact Us</h2>
            <img src='./assets/tech-support.gif' width='200'/>
            {/* <p>
              Customer support available 24x7.
              <br />
              Always looking for Customer Feedback.
            </p> */}
            <p>
              Ph no : +91 1234 5678
              <br />
              Email : support@delifood.com
            </p>
            <div className='contact-btn flex-center'>
              <button className='btn'>
                <a href='#' target='_blank'>
                  Send Mail
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact
