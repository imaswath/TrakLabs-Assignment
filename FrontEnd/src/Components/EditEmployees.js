import React, {useState, useEffect} from 'react'
import URL from '../config';
import NavBar from './NavBar'
const axios = require('axios');

export default function EditEmployees({match}) {
    const [name, setName] = useState("")
    const [age, setAge] = useState()
    const [loading, setLoading] = useState(false)
    const [selectedDept, setSelectedDept] = useState("")
    const [departments, setDepartments] = useState([])

    useEffect(() => {
        async function getDepartments(){
            try{
                const departments = await axios.get(`${URL}/ShowAllDepartments`).then((res)=>{console.log(res.data); setDepartments(res.data)})
            }
            catch{
                console.log("Failed To Fetch departments");
            }
        }
        getDepartments()
        console.log(Number(match.params.EmpId));
        async function getEmployee(id){
            const employeee = await axios.post(`${URL}/GetEmployee`,{EmpId: Number(id)}).then((res)=>{console.log(res.data); setName(res.data.EmpName); setAge(res.data.EmpAge)})
        }
        getEmployee(match.params.EmpId)
        
    }, [])

    const handleName = (e) => {
        setName(String(e.target.value))
    }
    const handleAge = (e) => {
        setAge(Number(e.target.value))
    }
    const handleDept = (e) => {
        setSelectedDept(String(e.target.value))
    }
    const handleSubmit = async(e) => {
        setLoading(true)
        e.preventDefault()
        const employee = await axios.put(`${URL}/UpdateEmployee`,{
                EmpId: Number(match.params.EmpId),
                EmpName: name,
                EmpAge: age,
                DeptName: selectedDept
            })
        if(employee) setLoading(false)
    }

    return (
        <div>
            <NavBar></NavBar>
            <div className="container my-4">
            <form className="row g-3 mx-auto my-5" onSubmit={handleSubmit}>
                    <div className="col-12 ">
                        <label htmlFor="name" className="form-label text-secondary fw-bold">Create Employee</label>
                        <input value={name} onChange={handleName} type="text" placeholder="Employee Name" className="form-control" id="name" required/>
                    </div>
                    <div className="col-12 ">
                        <input value={age} onChange={handleAge} type="text" placeholder="Employee Age" className="form-control" id="age" required/>
                    </div>
                    <div className="col-12 ">
                    <select
                        onChange={handleDept}
                        className="form-control"
                        placeholder="Category"
                        required
                         >
                        <option disabled selected>Select Department</option>
                        {departments && departments.map((department, index)=>(
                            <option key={index} value={department.DeptName}>{department.DeptName}</option>
                        ))}
                    </select>
                    </div>
                    <div className="col-12 mt-4">
                        <button type="submit" className="btn btn-success">{(loading)?(<div className="spinner-border text-light" role="status"></div>):('UPDATE')}</button>
                    </div>
            </form>
            </div>
        </div>
    )
}
