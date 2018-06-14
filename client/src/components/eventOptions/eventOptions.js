import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";

import InviteBlaster from '../inviteBlaster'
import EventInfoUpdate from '../../components/createEvent';

const EventOptions = props => {
    const whichContainer = (Comp, props)=> <Comp {...props}/>
    console.log(props)
  return (
    <Card className="mt-4">
      <CardHeader  className="text-center color">
        <CardTitle className="my-auto">Event Options</CardTitle>
        </CardHeader>
        <CardBody>
          <ListGroup>
            <ListGroupItem onClick={props.toggle.bind(this, EventInfoUpdate, {title:"Updated Info", event_id: props.event_id, toggle: props.toggle})} >Update Event Details</ListGroupItem>
            <ListGroupItem onClick={props.toggle.bind(this, InviteBlaster, {title:"Email",type:'email', event_id: props.event_id, event_name: props.event_name,toggle: props.toggle })}>Invite Blast Via Email</ListGroupItem>
            <ListGroupItem onClick={props.toggle.bind(this, InviteBlaster, {title:"Text",type:'phone', event_id: props.event_id, event_name: props.event_name,toggle: props.toggle })}>Invite Blast Via Text</ListGroupItem>
            <ListGroupItem>Add Event Admin</ListGroupItem>
            <ListGroupItem>Remove Event Admin</ListGroupItem>
          </ListGroup>
        </CardBody>
      
      <Modal
          isOpen={props.modal}
          toggle={props.toggle}
          className="p-0"
        >
         <ModalHeader className="py-0" toggle={props.toggle}/>
          <ModalBody className="p-0">
          {whichContainer(props.renderComp, props.renderCompProps)}
          </ModalBody>
        </Modal>
    </Card>
  );
};

export default EventOptions;
