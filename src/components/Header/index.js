import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <h2> Header da página</h2><br /> 
            <Link to='/contact'>Contact</Link> <br/><br/>
            <Link to='/about'>About</Link> <br/><br/>
        </header>
    )
}

export default Header