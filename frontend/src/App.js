
import './App.css';
import Grocery_Viewer from './Components/Gorcery-Viewer/grocery_viewer'
import Login from './Components/Login/login'
import Employee_Viewer from './Components/Employee-Viewer/employee_viewer'
import React, {useState } from "react";
import axios from 'axios';
import { Navbar} from 'react-bootstrap';
import trolly from './Images/trolly.png'

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [showError, setShowError] = useState(false);
  const [employeeView, setEmployeeView] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  //checks user credentials with database
  const userLogin = (email, pw) => {
    const query_string = "?email=" + email + "&pw=" + pw;
    axios.get("http://127.0.0.1:8000/api/employees/auth" + query_string)
        .then(response => {if (response.status = 200) {
          setLoggedIn(true);
          setShowError(false);
      }})
      .catch(error => {
        if (!error.response) {
          setErrorMsg('Error: Network Error');
          setShowError(true)
        } else {
            setErrorMsg("Invalid username or password");
            setShowError(true)
      }})
  }


  return (
    <div className="App">
      {
      loggedIn &&
      <Navbar className="nav">
        <img className="logo" src={trolly} alt="logo"></img>
      <Navbar.Brand>Inventory Manager</Navbar.Brand>
      <div className='button-container'>
      <button className="nav-button logout" onClick={() => {setLoggedIn(false); setEmployeeView(false)}} >Logout</button> 
      <button className="nav-button view-button" onClick={() => setEmployeeView(true)}>Add Employee</button>
      <button className="nav-button view-button" onClick={() => setEmployeeView(false)}>View Inventory</button>
      </div>
      </Navbar>
      }{
      !loggedIn && 
      <Login userLogin={userLogin} showError={showError} errorMsg={errorMsg}> </Login>
      }{
      loggedIn && employeeView &&
      <Employee_Viewer ></Employee_Viewer>
      }{
        loggedIn && !employeeView &&
      <Grocery_Viewer></Grocery_Viewer>
      }
    </div>

  )
}

export default App;

