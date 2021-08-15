import './App.css';
import Home from './Components/Home';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Employees from './Components/Employees';
import AddEmployee from './Components/AddEmployee';
import EditEmployees from './Components/EditEmployees';
import Departments from './Components/Departments';
import AddDepartment from './Components/AddDepartment';
import EditDepartment from './Components/EditDepartment';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/employees" exact component={Employees}></Route>
        <Route path="/create/employee" exact component={AddEmployee}></Route>
        <Route path="/employee/:EmpId" exact component={EditEmployees}></Route>
        <Route path="/departments" exact component={Departments}></Route>
        <Route path="/create/department" exact component={AddDepartment}></Route>
        <Route path="/department/:DeptId" exact component={EditDepartment}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
