import React from "react";
import { Card, Table, CardTitle, Badge, Button } from "reactstrap";

const DashContainer = props => {
  const MyEvents = () => {
    if (props.events_owned) {
      return (
        <Card className="mt-5">
          <CardTitle className="text-center my-auto">Events Owned</CardTitle>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Event Name</th>
                <th>Event Location</th>
                <th>Event Date/Event Time</th>
                <th># Attending</th>
                <th># Awaiting Approval</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {props.events_owned.map(item => (
                <tr>
                  <th scope="row">1</th>
                  <td>{item.event_name}</td>
                  <td>{item.event_location}</td>
                  <td>{item.event_date} @ {item.event_time}</td>
                  <td>{item.event_attendees_approved.length}</td>
                  <td>{item.event_signed_up.length - item.event_attendees_approved.length}</td>
        
                  <td><Badge color="primary" className="btn btn-primary">Manage</Badge></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      );
    }
  };

  console.log(props);
  return <div>{MyEvents()}</div>;
};
export default DashContainer;
