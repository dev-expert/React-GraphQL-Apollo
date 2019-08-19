
import React, { Component } from 'react';
import {TextField,Button,Container} from '@material-ui/core';
import gql from 'graphql-tag';



const createUser = gql`
  mutation createUser($name: String!,$age: Number!) {
    createUser(name:$name,age:$age) {
      name
      age
    }
  }`;

class RegisterForm extends Component {

    constructor()
    {
      super();
      this.state={
        name:"",
        age:null
      }
      this.createNewUser = this.createNewUser.bind(this);
    }
    async createNewUser() {

      const query = `mutation {
        createUser(name:"${this.state.name.toString()}",age:${this.state.age}) {
          name
          age
        }
      }`;
  
      const option = {
        method: 'POST',
        headers: { 'Content-Type': 'application/graphql' },
        body: query
      }
    
      const res = (await fetch('http://localhost:5000/graphql', option));
      const json = (await res.json());
           
    }

  acceptName=(e)=>{
    this.setState({
      name:e.target.value
    })
  }

  acceptAge=(e)=>{
    this.setState({
      age:e.target.value
    })
  }

  render() {
    return (

        <Container>
              <TextField
                placeholder="Input Your Name"
                label="Enter Your Name" onChange={(e)=>this.acceptName(e)}/>
                <br/>
               
                <TextField type="number"
                placeholder="Input Your Age"
                label="Enter Age"  onChange={(e)=>this.acceptAge(e)}/>
                    <br/><br/>
                <Button variant="contained" color="primary" onClick={this.createNewUser}>
                  Submit
                </Button>
          
        </Container>
    );
  }
}


export default RegisterForm;