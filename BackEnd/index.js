const express = require("express");
const app = express();
const bodyparser = require("body-parser")
app.use(bodyparser.json())
const cors = require("cors")
app.use(cors())
const { Sequelize,QueryTypes } = require('sequelize');
const sequelize = new Sequelize('Traklab', 'postgres', 'Abc!23Zyx', {
    host: 'localhost',
    dialect: 'postgres'
  });
  const Dept = require("./models/DeptModel.js")
  const Emp = require("./models/EmpModel.js");
const { findAll } = require("./models/DeptModel.js");
Emp.belongsTo(Dept, { foreignKey: 'DeptId' });
Dept.hasOne(Emp, { foreignKey: 'DeptId' });

app.get("/api",(req,res)=>{
    res.send("Hi")
 })
app.listen(5000,async()=>{
    console.log("App is running")
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
});

app.post("/api/InsertEmployee",async(req,res)=>{
    const DeptId= await Dept.findOne({where:{DeptName:req.body.DeptName},attributes: ["DeptId"],raw:true})
    const Employee=await Emp.create({EmpName:req.body.EmpName,EmpAge:req.body.EmpAge,DeptId:DeptId.DeptId})
    console.log(Employee);
    res.send(Employee);
})

app.get("/api/ShowAllEmployees",async(req,res)=>{
    const Employees=await Emp.findAll({include: Dept})
    res.send(Employees)

})

app.delete("/api/DeleteEmployee",async(req,res)=>{
  console.log(req.body)  
  const delt = await Emp.destroy({
        where: {
          EmpId: req.body.EmpId
        }
      });
      res.json(delt)
})

app.put("/api/UpdateEmployee",async(req,res)=>{
    
    const DeptId= await Dept.findOne({where:{DeptName:req.body.DeptName},attributes: ["DeptId"],raw:true});
    const updated=await Emp.update({EmpName:req.body.EmpName,EmpAge:req.body.EmpAge,DeptId:DeptId.DeptId}, {
        where: {
          EmpId: req.body.EmpId
        }
      });
      res.json(updated)
})

app.post("/api/SearchEmployee",async(req,res)=>{
  const details= await Emp.findOne({where:{EmpName:req.body.EmpName},raw:true,include:Dept});
  res.json(details)
})

app.post("/api/GetEmployee",async(req,res)=>{
    
  const details= await Emp.findOne({where:{EmpId:req.body.EmpId},raw:true,include:Dept});
  res.json(details)
})

app.get("/api/ShowAllDepartments",async(req,res)=>{
    const Depts=await Dept.findAll()
    res.send(Depts)

})

app.post("/api/InsertDepartment",async(req,res)=>{
    const Depts=await Dept.create({DeptName:req.body.DeptName})
    res.send(Depts)
})

app.delete("/api/DeleteDepartment",async(req,res)=>{
    const delt = await Dept.destroy({
        where: {
          DeptId: req.body.DeptId
        }
      });
      res.json(delt)
})

app.post("/api/GetDepartment",async(req,res)=>{
    
    const details=await Dept.findOne({where:{DeptId: req.body.DeptId}});
    res.json(details)
})

app.put("/api/UpdateDepartment",async(req,res)=>{
    const updated=await Dept.update({DeptName:req.body.DeptName}, {
        where: {
          DeptId: req.body.DeptId
        }
      });
      res.json(updated)
})