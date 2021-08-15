import React from 'react'
import NavBar from './NavBar'
import {Link} from "react-router-dom"


export default function Home() {
    return (
        <div>
            <div className="app">
            <NavBar></NavBar>
            <div className="home">
            <Link to="/employees" className="btn btn-primary btn-lg">Manage Employees</Link>
            <Link to="/departments" className="btn btn-primary btn-lg">Manage Departments</Link>
            </div>
            </div>
        </div>
    )
}
