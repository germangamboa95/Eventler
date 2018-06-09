import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardSubtitle,
  CardTitle
} from "reactstrap";
import moment from "moment";

const EventInfoDisplay = props => {
  return (
    <Card className="mt-4">
      <CardImg top width="100%" src={props.event_img} alt="Card image cap" />
      <CardBody className="text-center">
        <CardTitle>{props.event_name}</CardTitle>
        <CardSubtitle>Description:</CardSubtitle>
        <CardText>{props.event_desc}</CardText>
        <CardSubtitle>Location:</CardSubtitle>
        <CardText>{props.event_location}</CardText>
        <CardSubtitle>Date &amp; Time:</CardSubtitle>
        <CardText>{moment(props.event_date).format("MMMM Do YYYY, h:mm a")}</CardText>
        <CardSubtitle>Number Attending:</CardSubtitle>
        <CardText>{props.event_signed_up ? props.event_signed_up.length : 0}</CardText>
      
      </CardBody>
    </Card>
  );
};

export default EventInfoDisplay;
