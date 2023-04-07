import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div>About

      <Link to='/about'> Sobre</Link>
      <Link to='/contact'> Contacts</Link>
    </div>
  )
}

export default About