import React from "react";
import { Card, CardTitle, CardBody, CardText } from "reactstrap";

const ThankYou = props => {
  return (
    <div className="d-flex ">
      <Card className="text-center">
        <CardTitle>Thank You!</CardTitle>
        <CardBody>
          <CardText>
            You will recieve in an email shortly confirming your sign up. Once
            the event manager approves you into the event you will also be
            notified by email and text.
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default ThankYou;
