import React,{useEffect,useState} from 'react'
import URL from '../config';
import NavBar from './NavBar'
import {Link} from "react-router-dom"
import {MdEdit,MdDelete} from 'react-icons/md'
const axios = require('axios');

export default function Departments() {

    const [departments, setDepartments] = useState([])

    useEffect(() => {
        async function getDepartments(){
            const departments = await axios.get(`${URL}/ShowAllDepartments`).then((res)=>{console.log(res.data); setDepartments(res.data)})
        }
        getDepartments()
    }, [departments])

    const handleDelete = async(id) => {
        const dept = await axios.delete(`${URL}/DeleteDepartment`,{
            data:{DeptId:Number(id)}
        }).then((res)=>{console.log(res.data);})
    }

    return (
        <div>
            <NavBar></NavBar>
            <div className="container cont my-4">
                <div className="row prod g-2 ">
                    {departments && departments.map((department, index)=>(
                         <div key={index} className="col-12 col-md-4">
                         <div className="cat card h-100">
                             <h6 className="m-0 fw-light ps-2">{department.DeptName} </h6>
                             <div className="btn-group">
                             <Link to={`/department/${department.DeptId}`} className=" btn btn-warning"><MdEdit size={15} className="my-1"></MdEdit></Link>
                             <button className="btn btn-danger" onClick={()=>{handleDelete(department.DeptId)}}><MdDelete size={15} className="my-1"></MdDelete></button>
                         </div>
                         </div>
                     </div>
                    ))}
                </div>
                <Link to={"/create/department"} className="btn btn-primary mt-3">Add Department</Link>
            </div>
        </div>
    )
}
