import React from "react";
import {
  Card,
  Table,
  CardTitle,
  Badge,
  Button,
  CardFooter,
  UncontrolledTooltip
} from "reactstrap";

const CheckInTable = props => {
  if (props.whichList) {
    const whichlistIdStr = props.whichList.map(item => item._id).join(",");
    const awaitingApproval = props.whichList.map((item, i) => {
      const btnColor =
        props.event_attendees_checkedIn.indexOf(item._id) > -1
          ? "danger"
          : "success";
      const btnText =
        props.event_attendees_checkedIn.indexOf(item._id) > -1
          ? "Check In"
          : "Check Out";

      return (
        <tr key={i}>
          <th scope="row">{i + 1}</th>
          <td>{item.first_name}</td>
          <td>{item.last_name}</td>
          <td>
            <Button
              outline
              color="info"
              onClick={props.sendEmail.bind(this, item._id, props.list)}
            >
              {item.email}
            </Button>
          </td>
          <td>
            <Button
              outline
              color="info"
              onClick={props.sendText.bind(this, item._id, props.list)}
            >
              {item.cell}
            </Button>
          </td>
          <td>
            <Badge
              color={btnColor}
              className={`btn btn-${btnColor}`}
              onClick={props.toggle.bind(this, item._id)}
            >
              {btnText}
            </Badge>
          </td>
        </tr>
      );
    });

    return (
      <Card className="mt-3 text-center">
        <CardTitle className="my-auto py-1 color ">{props.title}</CardTitle>
        <Table responsive>
          <thead>
            <tr className="th-color">
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th id="emailTp">Email</th>
              <th id="textTp">Phone</th>
              <th>{props.btn}</th>
            </tr>
          </thead>
          <tbody>{awaitingApproval}</tbody>
        </Table>
        <CardFooter className="d-flex flex-row justify-content-end">
          {props.whichList.length !== 0 ? (
            <div>
              <Button
                size="sm"
                className="mr-1"
                onClick={props.sendEmail.bind(this, whichlistIdStr, props.list)}
              >
                Email All
              </Button>
              <Button
                size="sm"
                onClick={props.sendText.bind(this, whichlistIdStr, props.list)}
              >
                Text All
              </Button>
            </div>
          ) : (
            <div />
          )}
        </CardFooter>
        <UncontrolledTooltip placement="right" target="emailTp">
          Click on someone's Email to send them a message!
        </UncontrolledTooltip>
        <UncontrolledTooltip placement="right" target="textTp">
          Click on someone's Phone number to send them a message!
        </UncontrolledTooltip>
      </Card>
    );
  } else {
    return <hr />;
  }
};

export default CheckInTable;
