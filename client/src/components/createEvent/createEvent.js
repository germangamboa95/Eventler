import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const createEvent = props => {

  return (
    <Form>
      <FormGroup>
        <Label for="fname">First Name:</Label>
        <Input />
      </FormGroup>
      <FormGroup>
        <Label for="lname">Last Name:</Label>
        <Input />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email:</Label>
        <Input/>
      </FormGroup>
      <FormGroup>
        <Label for="cell">Cell Number: XXX-XXX-XXXX</Label>
        <Input/>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
};

export default createEvent;
