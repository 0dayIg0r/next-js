import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div>
            <h1>Ocorreu um erro!</h1> <br></br> <br/>

            <span>VocÊ pode está procurando:</span>

            <Link to='/home'>Home</Link> <br/><br/>
            <Link to='/contact'>Contact</Link> <br/><br/>
            <Link to='/about'>About</Link> <br/><br/>
        </div>
    )
}

export default Error