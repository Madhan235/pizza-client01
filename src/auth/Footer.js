import React from 'react'
import { FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";
 

const Footer = () => {
    const date = new Date()
  return (
    <footer className='welcome-footer'>
    &copy; CheeseFactory {date.getFullYear()}  
    <FaFacebookSquare/>  
    <FaInstagram/>
    <FaTwitter/>
    </footer>
  )
}

export default Footer