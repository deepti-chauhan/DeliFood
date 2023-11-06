import React from 'react'
import '../styles/Footer.css'
import { Link } from 'react-router-dom'
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa'
function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className='footer-container flex'>
      <div className='footer-subscribe flex'>
        <p>Subscribe our Newsletter</p>
        <div className='footer-email flex'>
          <label>Email</label>
          <input type='text' placeholder=' type your email...'></input>
          <button className='btn'>Subscribe</button>
        </div>
      </div>
      <div className='flex footer'>
        <div className='wrapper footer-main'>
          <span>Company</span>
          <Link to='/' onClick={scrollToTop}>
            Home
          </Link>
          <Link to='/about' onClick={scrollToTop}>
            About Us
          </Link>
          <Link to='/menu' onClick={scrollToTop}>
            Menu
          </Link>
          <Link to='/contact' onClick={scrollToTop}>
            Contact
          </Link>
        </div>
        <div className='wrapper '>
          <span>Services</span>
          <ul className='footer-list'>
            <li>Fast Delivery</li>
            <li>Best Quality Food</li>
            <li>Discount Offers</li>
            <li>Customer Support</li>
          </ul>
        </div>
        <div className='wrapper'>
          <span>Follow us</span>
          <ul className='footer-list flex-sb'>
            <li>
              <FaFacebook />
            </li>
            <li>
              <FaTwitter />
            </li>
            <li>
              <FaInstagram />
            </li>
            <li>
              <FaGithub />
            </li>
          </ul>
        </div>
        <div className='wrapper footer-address flex-sb'>
          <span>Address</span>
          <p>
            Some random Street no. <br />
            Random City - pincode <br />
            Random Country
            <br />
            Random Text
          </p>
        </div>
      </div>
      <p>Made By Deepti &#x2764; {new Date().getFullYear()} </p>
    </footer>
  )
}

export default Footer
