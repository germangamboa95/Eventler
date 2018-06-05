import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


const userForm = props => {
    console.log(props)
  return (
    <Form>
    <FormGroup>
      <Label for="fname">First Name:</Label>
      <Input type="text" name={props.first_name} id="fname" placeholder={(props.first_name)? props.first_name: "Insert First Name..."} value={(props.first_name)? props.first_name: ''} required/>
    </FormGroup>
    <FormGroup>
      <Label for="lname">Last Name:</Label>
      <Input type="text" name={props.last_name}id="lname" placeholder={(props.last_name)? props.last_name: "Insert Last Name..."} value={(props.last_name)? props.last_name: ''} required />
    </FormGroup>
    <FormGroup>
      <Label for="email">Email:</Label>
      <Input type="email" name={props.email} id="email" placeholder={(props.email)? props.email: "Insert Email..."} value={(props.email)? props.email: ''} required/>
    </FormGroup>
    <FormGroup>
      <Label for="cell">Cell Number: XXX-XXX-XXXX</Label>
      <Input type="tel"  name={props.cell} pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$" id="cell" placeholder={(props.cell)? props.email: "Insert Cell Number..."} value={(props.cell)? props.cell: ''} required/>
    </FormGroup>
    <Button>Submit</Button>
  </Form>
  );
};

export default userForm;