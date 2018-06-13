import React from "react";
import { Card, Table, CardTitle,Button } from "reactstrap";
import moment from "moment";
import InviteLink from "../inviteLink";
import './eventTable.css';
const MyEvents = props => {
  if (props.events_owned !== undefined) {
    return (
      <Card className="mt-5 border-1">
        <CardTitle className="text-center my-auto py-2 color">Up Coming Events</CardTitle>
        <Table responsive  className="text-center my-auto">
          <thead className="th-color">
            <tr>
              <th>#</th>
              <th>Event Name</th>
              <th>Event Location</th>
              <th>Event Date/Event Time</th>
              <th># Attending</th>
              <th># Awaiting Approval</th>
              <th>Invite Link</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {props.events_owned.map((item, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{item.event_name}</td>
                <td>{item.event_location}</td>
                <td>
                  {moment(item.event_date).format("MMMM Do YYYY, h:mm a")}
                </td>
                <td>{item.event_attendees_approved.length} guests</td>
                <td>{item.event_signed_up.length} guests</td>
                <td>
                  <InviteLink event_id={item._id} {...props} />
                </td>

                <td>
                  <Button
                    size="sm"
                    color="info"
                    className="btn btn-primary"
                    onClick={props.ManageEventReq.bind(this, item._id)}
                  >
                    Manage
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    );
  } else {
    return <div />;
  }
};

const EventTable = props => MyEvents(props);

export default EventTable;
