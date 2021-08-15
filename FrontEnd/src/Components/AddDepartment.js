import React, {useState, useEffect} from 'react'
import URL from '../config';
import NavBar from './NavBar'
const axios = require('axios');

export default function AddDepartment() {
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const handleName = (e) => {
        setName(String(e.target.value))
    }

    const handleSubmit = async(e) => {
        setLoading(true)
        e.preventDefault()
        const department = await axios.post(`${URL}/InsertDepartment`,{
                DeptName: name
            })
        if(department) setLoading(false)
    }

    return (
        <div>
            <NavBar></NavBar>
            <div className="container my-4">
            <form className="row g-3 mx-auto my-5" onSubmit={handleSubmit}>
                    <div className="col-12 ">
                        <label htmlFor="name" className="form-label text-secondary fw-bold">Create New Departmnet</label>
                        <input value={name} onChange={handleName} type="text" placeholder="Department Name" className="form-control" id="name" required/>
                    </div>
                    <div className="col-12 mt-4">
                        <button type="submit" className="btn btn-success">{(loading)?(<div className="spinner-border text-light" role="status"></div>):('CREATE')}</button>
                    </div>
            </form>
            </div>
        </div>
    )
}
