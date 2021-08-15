import React from 'react'
import {Link} from "react-router-dom"

const NavBar = () => {
    return (     

    <nav class="navbar navbar-dark bg-dark">
    <div class="container">
        <a class="navbar-brand" href="#">
            
            <Link to={"/"} className="text-white" style={{textDecoration:"none"}}>Employee Management System</Link>
        </a>
    </div>
    </nav>
    )
}

export default NavBar
