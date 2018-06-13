import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody
} from "reactstrap";

import Messenger from "../messenger/";
import EventInfoUpdate from '../../components/createEvent';

const EventOptions = props => {
    const whichContainer = (Comp, props)=> <Comp {...props}/>
    console.log(props)
  return (
    <Card className="mt-4">
      <CardHeader className="text-center color">
        <CardTitle className="my-auto">Event Options</CardTitle>
        </CardHeader>
        <CardBody>
          <ListGroup>
            <ListGroupItem onClick={props.toggle.bind(this, EventInfoUpdate, {title:"Updated Info", event_id: props.event_id})} >Update Event Details</ListGroupItem>
            <ListGroupItem >Invite Blast Via Email</ListGroupItem>
            <ListGroupItem>Invite Blast Via Text</ListGroupItem>
            <ListGroupItem>Add Event Admin</ListGroupItem>
            <ListGroupItem>Remove Event Admin</ListGroupItem>
          </ListGroup>
        </CardBody>
      
      <Modal
          isOpen={props.modal}
          toggle={props.toggle}
          className="p-0"
        >
          <ModalBody>
          {whichContainer(props.renderComp, props.renderCompProps)}
          </ModalBody>
        </Modal>
    </Card>
  );
};

export default EventOptions;
