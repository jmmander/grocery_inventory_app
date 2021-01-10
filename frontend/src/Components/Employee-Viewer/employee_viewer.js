import React, { useState,  }  from "react";
import {Row, Col, Form, Button} from 'react-bootstrap';
import axios from 'axios';
import './employee_viewer.css'


 function Employee_Viewer() {

    const [employeeView, setEmployeeView] = useState(false)
    const [employee, setEmployee] = useState({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
    })
    const [error, setError] = useState("")
    const [confirmation, setConfirmation] = useState("")

    //updates employee state with input
    const handleChange = (e) => {
        const changedElement = e.target;
        const name = changedElement.name;
        const value = changedElement.value.trim();
        setEmployee({...employee, [name]: value }); 
    };

    //adds new employee to backend
    const addEmployee = (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/api/employees/", employee)
        .then(response => {
            if (response.status === 201)
                {
                setConfirmation(employee.first_name + " successfully added");
                setError("");
            } else {
                setError("Something unexpected happened. Error code: " + response.status + response.statusText);
                setConfirmation("")
            }})
        .catch(err => {
            setError("Unable to add employee. " + err);
            setConfirmation("");
            })
        }

    
    const changeView = () => {
        setEmployeeView(!employeeView);
        setError("");
        setConfirmation("");
    }

    return (
    <>
        {employeeView ?  
        <>
        <div className="button-container"><Button className="emp-button" onClick={changeView}>Hide form</Button></div>
        <div className="emp-form">
        <Form onSubmit={addEmployee}>
        <Form.Group as={Row}  controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" maxLength="120" onChange={handleChange}/>
        </Form.Group>
        <Form.Group as={Row} controlId="First">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="first_name" placeholder="Enter first name" maxLength="20" onChange={handleChange}/>
        </Form.Group>
        <Form.Group as={Row} controlId="Last">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="last_name" placeholder="Enter last name" maxLength="20" onChange={handleChange}/>
        </Form.Group>
        <Form.Group as={Row} controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" minLength="5" maxLength="20" onChange={handleChange}/>
        </Form.Group>
        <Button type="submit">
          Submit
        </Button>
        <p className="error">{error}</p>
        <p className="confirmation">{confirmation}</p>
        </Form>
        </div>
        </>
        :
        <div className="button-container"><Button className="emp-button" onClick={changeView}>Add Employee</Button></div>
    }

    </>
    )
 }


export default Employee_Viewer
