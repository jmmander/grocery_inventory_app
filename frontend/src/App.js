
import './App.css';
import Grocery_Viewer from './Components/Gorcery-Viewer/grocery_viewer'
import Login from './Components/Login/login'
import Employee_Viewer from './Components/Employee-Viewer/employee_viewer'
import React, {useState } from "react";
import axios from 'axios';
import {Button} from 'react-bootstrap';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [showError, setShowError] = useState(false);

  //checks user credentials with database
  const userLogin = (email, pw) => {
    const query_string = "?email=" + email + "&pw=" + pw;
    axios.get("http://127.0.0.1:8000/api/employees/auth" + query_string)
        .then(response => {if (response.status = 200) {
          setLoggedIn(true);
          setShowError(false);
      }})
      .catch(error => {
        setShowError(true)
      })
    
 
  }

  const logout = () => {
    setLoggedIn(false)
  }

  return (
    <div className="App">
      <h1>Inventory</h1>
      {!loggedIn ? 
      <Login userLogin={userLogin} showError={showError}> </Login>
      :
      <div>
      <Button className="logout" onClick={logout} >Logout</Button>
      <Employee_Viewer></Employee_Viewer>
      <Grocery_Viewer></Grocery_Viewer>
      </div>
      }
      
    </div>

  )
}

export default App;

