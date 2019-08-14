
import React, { Component } from 'react';
import {TextField,Button,Container} from '@material-ui/core';

class RegisterForm extends Component {
  render() {
    return (
        <Container>
           
                <TextField
                placeholder="Input Your Name"
                label="Enter Your Name" />
                <br/>
                <TextField
                placeholder="Input Email Address"
                label="Enter Email" />
                <br/>
                <TextField
                placeholder="Input Mobile Number"
                label="Enter Mobile Number" />
                    <br/><br/>
                <Button variant="contained" color="primary">
                    Submit
                </Button>
          
        </Container>
    );
  }
}

export default RegisterForm;