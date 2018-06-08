import React from "react";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";



const Messenger = props => {
  console.log(props.match)
  const nameGenerator = () => {
    // TODO: Fix this to only by one statement and not two concat ones.
    try {
      return props[props.match.params.list]
        .filter(name => props.match.params.user.split(',').indexOf(name._id) > -1)
        .map(item => item.first_name + " " + item.last_name)
        .join(", ")
    } catch (error) {
      return "";
    }
  };
  return (
    <Form className="mt-5" onSubmit={(e) => props.dispatchMsg(e, props.match.params.user.split(','), props.match.params.type)}>
      <h2 className="text-center">Send {props.match.params.type}</h2>
      <h4>To: {nameGenerator()}</h4>
      <FormGroup row>
        <Label for="exampleSelect" sm={2}>
          <h4>Title</h4>
        </Label>
        <Col sm={10}>
          <Input type="text" name="title" id="exampleSelect" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleText" sm={2}>
          <h4>Message</h4>
        </Label>
        <Col sm={10}>
          <Input type="textarea" name="msg" id="exampleText" />
        </Col>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
};

export default Messenger;
