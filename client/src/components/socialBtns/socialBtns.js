import React from "react";
import { Card, Button, CardTitle, CardBody } from "reactstrap";

const socialLogin = props => {
  return (
    <Card>
      <CardBody className="text-center d-flex flex-column justify-content-around">
        <CardTitle>{props.msg}</CardTitle>
        <Button
          href="http://localhost:3000/api/auth/facebook"
          className="m-1 d-flex justify-content-start w-100"
        >
          <i className="fab fa-facebook-square fa-1x my-auto mr-3" />
          <span className="d-inline-block my-auto mr-1">
            {props.msg} with Facebook
          </span>
        </Button>
        <Button
          href="http://localhost:3000/api/auth/google"
          className="m-1 d-flex justify-content-start w-100"
        >
          <i className="fab fa-google fa-1x my-auto mr-3" />
          <span className="d-inline-block my-auto  px-1">
            {props.msg} with Google
          </span>
        </Button>
      </CardBody>
    </Card>
  );
};

export default socialLogin;
