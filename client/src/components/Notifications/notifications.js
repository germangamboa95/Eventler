import React from "react";
import { Card,CardTitle, CardBody, ListGroup, ListGroupItem } from "reactstrap";

const Notifications = props => (
  <Card className="mt-5">
    <CardTitle className="text-center">Information Center</CardTitle>
    <CardBody>
      <h4>Welcome back, {props.first_name}</h4>
      <h5 className="text-center">Notifications</h5>
      <ListGroup>
        <ListGroupItem>Carlos Signed for for German's Party</ListGroupItem>
        <ListGroupItem>Kevin Signed for for German's Party</ListGroupItem>
        <ListGroupItem>John accepted admin request for German's party</ListGroupItem>
        <ListGroupItem>German's Party is now full.</ListGroupItem>
      </ListGroup>
    </CardBody>
  </Card>
);

export default Notifications;
