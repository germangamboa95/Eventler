import React from "react";
import {Card } from "reactstrap";
const EventInfoDisplay = props => {
  return (
    <Card>
      <h2>{props.event_name}</h2>
      <p>{props.event_location}</p>
      <p>{props.event_date}</p>
      <p>{props.event_time}</p>
      <p>
        {props.event_signed_up ? props.event_signed_up.length : 0}
      </p>
    </Card>
  );
};

export default EventInfoDisplay;
