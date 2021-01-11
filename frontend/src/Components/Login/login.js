//https://react-bootstrap.github.io/components/forms/

import React, { useState } from "react";
import { Button, Form} from 'react-bootstrap';
import './login.css'

function Login(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    
    //sends login data to App components userlogin fuction
    const handleSubmit = (e) =>  { 
        e.preventDefault();
        props.userLogin(email, password);
    }

    return (
      <div className="loginContainer">
      <div class="heading"> <h3>Login</h3> </div>
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="Email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} maxLength="120" onChange={(e) => setEmail(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId="Password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password}  minLength="5" maxLength="20" onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>
      { props.showError &&
      <p className="error">Invalid username or password. Please try again.</p>
      }
      <Button type="submit">
        Submit
      </Button>
      </Form>
      </div>
    
    )
}

export default Login
