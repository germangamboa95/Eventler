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
import "./table.css";
const AttendeeTable = props => {
  if (props.whichList) {
    const whichlistIdStr = props.whichList.map(item => item._id).join(",");
    const awaitingApproval = props.whichList.map((item, i) => (
      <tr key={i}>
        <th scope="row">{i + 1}</th>
        <td>{item.first_name}</td>
        <td>{item.last_name}</td>
        <td>
          <a
            className="link"
            onClick={props.sendEmail.bind(this, item._id, props.list)}
          >
            {item.email}
          </a>
        </td>
        <td>
          <a
            className="link-1"
            onClick={props.sendText.bind(this, item._id, props.list)}
          >
            {item.cell}
          </a>
        </td>
        <td>
          <Button
            size="sm"
            color="primary"
            className="btn btn-primary"
            onClick={props.toggle.bind(this, item._id)}
          >
            {props.btn}
          </Button>
        </td>
        <td>
          <Button
            size="sm"
            color="primary"
            className="btn btn-primary"
            onClick={props.deleteGuest.bind(this, item._id, props.list)}
          >
            Delete From Event
          </Button>
        </td>
      </tr>
    ));

    return (
      <Card className="mt-3 text-center">
        <CardTitle className="my-auto py-2 color ">{props.title}</CardTitle>
        <Table responsive className="mb-0">
          <thead className="th-color">
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th id="emailTp">Email</th>
              <th id="textTp">Phone</th>
              <th>{props.btn}</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{awaitingApproval}</tbody>
        </Table>
        <CardFooter className="d-flex flex-row justify-content-end">
          {props.whichList.length !== 0 ? (
            <div>
              <Button
                size="sm"
                ccolor="secondary"
                className="mr-1"
                onClick={props.sendEmail.bind(this, whichlistIdStr, props.list)}
              >
                Email All
              </Button>
              <Button
                color="secondary"
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

export default AttendeeTable;
