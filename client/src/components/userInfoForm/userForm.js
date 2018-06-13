import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const userForm = props => {
  console.log(props, "l");
  return (
    <Form onSubmit={(e) => props.handleSubmit(e)} className="mt-4 card p-5 mx-auto">
      <h2>{props.title}</h2>
      <FormGroup>
        <Label for="fname">First Name:</Label>
        <Input
          onChange={props.inputChange}
          type="text"
          name="first_name"
          id="fname"
          placeholder={
            props.first_name ? props.first_name : "Insert First Name..."
          }
          value={props.first_name ? props.first_name : ""}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="lname">Last Name:</Label>
        <Input
          onChange={props.inputChange}
          type="text"
          name="last_name"
          id="lname"
          placeholder={
            props.last_name ? props.last_name : "Insert Last Name..."
          }
          value={props.last_name ? props.last_name : ""}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email:</Label>
        <Input
          onChange={props.inputChange}
          type="email"
          name="email"
          id="email"
          placeholder={props.email ? props.email : "Insert Email..."}
          value={props.email ? props.email : ""}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="cell">Cell Number: XXX-XXX-XXXX</Label>
        <Input
          onChange={props.inputChange}
          type="tel"
          name="cell"
          pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
          id="cell"
          placeholder={props.cell ? props.email : "Insert Cell Number..."}
          value={props.cell ? props.cell : ""}
          required
        />
      </FormGroup>
      <Button color="warning">Submit</Button>
    </Form>
  );
};

export default userForm;
