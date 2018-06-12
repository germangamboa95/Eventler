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
    const whichContainer = (Comp)=> <Comp/>
    console.log(props, 'options container')
  return (
    <Card className="mt-4">
      <CardHeader className="text-center">
        <CardTitle>Event Options</CardTitle>
        <CardBody>
          <ListGroup>
            <ListGroupItem onClick={props.toggle.bind(this, EventInfoUpdate)} >Update Event Details</ListGroupItem>
            <ListGroupItem >Invite Blast Via Email</ListGroupItem>
            <ListGroupItem>Invite Blast Via Text</ListGroupItem>
            <ListGroupItem>Add Event Admin</ListGroupItem>
            <ListGroupItem>Remove Event Admin</ListGroupItem>
          </ListGroup>
        </CardBody>
      </CardHeader>
      <Modal
          isOpen={props.modal}
          toggle={props.toggle}
        >
          <ModalBody>
          {whichContainer(props.renderComp)}
          </ModalBody>
        </Modal>
    </Card>
  );
};

export default EventOptions;
