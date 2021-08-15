import React,{useEffect,useState} from 'react'
import NavBar from './NavBar'
import {Link} from "react-router-dom"
import {MdEdit,MdDelete} from 'react-icons/md'
import URL from '../config';
const axios = require('axios');

const Employees = () => {

    const [employees, setEmployees] = useState([])
    const [query, setQuery] = useState("")
    const [result, setResult] = useState()

    useEffect(() => {
        async function getEmployees(){
            const employees = await axios.get(`${URL}/ShowAllEmployees`).then((res)=>{console.log(res.data); setEmployees(res.data)})
        }
        getEmployees()
    }, [employees])

    const handleDelete = async(id) => {
        const employees = await axios.delete(`${URL}/DeleteEmployee`,{
            data:{EmpId:id}
        }).then((res)=>{console.log(res.data);})
    }

    const handleSearch = async() => {
        const employee = await axios.post(`${URL}/SearchEmployee`,{
            EmpName:String(query)
        }).then((res)=>{console.log("RES",res.data); setResult(res.data)})
    }
    const handleQuery = (e) => {
        setQuery(String(e.target.value))
    }

    return (
        <div>
            <NavBar></NavBar>
            <div className="container my-4">

            <div class="input-group mb-3">
                <input type="text" value={query} onChange={handleQuery} class="form-control" placeholder="Employee Name" aria-label="Employee Name" aria-describedby="button-addon2"/>
                <button onClick={handleSearch} class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
            </div>

            {result && (<div className="row result bg-dark g-2 my-2">
                <h4 className="text-white m-0 fw-bold">Search Results</h4>
                <div className="col-12 col-md-4">
                <div className="card res h-100">
                <div className="card-body">
                    <h5 className="card-title">{}</h5>
                    <p className="card-text fw-light">Name: {result.EmpName}<br></br>Age: {result.EmpAge}<br></br>Department: {result["Dept.DeptName"]}</p>
                    <Link to={`/employee/${result.EmpId}`} className="btn btn-warning"><MdEdit size={20} className="my-1"></MdEdit></Link>
                    <button className="ms-1 btn btn-danger" onClick={()=>{handleDelete(result.EmpId)}}><MdDelete size={20} className="my-1"></MdDelete></button>
                </div>
                </div>
                </div>
            </div>)}

            <div className="row prod g-2 ">
            {employees && employees.map((employee, index)=>(
                <div key={index} className="col-12 col-md-4">
                <div className="card h-100">
                <div className="card-body">
                    <h5 className="card-title">{}</h5>
                    <p className="card-text fw-light">Name: {employee.EmpName}<br></br>Age: {employee.EmpAge}<br></br>Department: {employee.Dept.DeptName}</p>
                    <Link to={`/employee/${employee.EmpId}`} className="btn btn-warning"><MdEdit size={20} className="my-1"></MdEdit></Link>
                    <button className="ms-1 btn btn-danger" onClick={()=>{handleDelete(employee.EmpId)}}><MdDelete size={20} className="my-1"></MdDelete></button>
                </div>
                </div>
                </div>
            ))}
            </div>
            <Link to={"/create/employee"} className="btn btn-primary mt-3">Add Employee</Link>
            </div>
        </div>
    )
}

export default Employees
