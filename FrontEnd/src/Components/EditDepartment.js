import React, {useState, useEffect} from 'react'
import URL from '../config';
import NavBar from './NavBar'
const axios = require('axios');

export default function EditDepartment({match}) {

    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getDepartment(id){
            try{
                const department = await axios.post(`${URL}/GetDepartment`,{DeptId:Number(id)}).then((res)=>{console.log(res.data); setName(res.data.DeptName)})
            }
            catch{
                console.log("Failed To Fetch department");
            }
        }
        getDepartment(match.params.DeptId)
    }, [])

    const handleSubmit = async(e) => {
        setLoading(true)
        e.preventDefault()
        const dept = await axios.put(`${URL}/UpdateDepartment`,{
                DeptId: Number(match.params.DeptId),
                DeptName: name
            })
        if(dept) setLoading(false)
    }

    const handleName = (e) => {
        setName(String(e.target.value))
    }

    return (
        <div>
            <NavBar></NavBar>
            <div className="container my-4">
            <form className="row g-3 mx-auto my-5" onSubmit={handleSubmit}>
                    <div className="col-12 ">
                        <label htmlFor="name" className="form-label text-secondary fw-bold">Update Departmnet</label>
                        <input value={name} onChange={handleName} type="text" placeholder="Department Name" className="form-control" id="name" required/>
                    </div>
                    <div className="col-12 mt-4">
                        <button type="submit" className="btn btn-success">{(loading)?(<div className="spinner-border text-light" role="status"></div>):('UPDATE')}</button>
                    </div>
            </form>
            </div>
        </div>
    )
}
