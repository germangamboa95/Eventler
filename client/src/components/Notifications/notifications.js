import React from "react";
import { Card,CardTitle, CardBody, ListGroup, ListGroupItem } from "reactstrap";
import "./notifications.css"
const Notifications = props => (
  <Card className="mt-5 notifications">
    <CardTitle className="text-center py-2 color">Information Center</CardTitle>
    <CardBody>
      <h4>Welcome back, {props.first_name}</h4>
      <h5 className="text-center">Notifications</h5>
      <ListGroup className="color-borders">
        <ListGroupItem>Carlos Signed up for German's Party</ListGroupItem>
        <ListGroupItem>Kevin Signed up for German's Party</ListGroupItem>
        <ListGroupItem>John accepted admin request for German's party</ListGroupItem>
        <ListGroupItem>German's Party is now full.</ListGroupItem>
      </ListGroup>
    </CardBody>
  </Card>
);

export default Notifications;
