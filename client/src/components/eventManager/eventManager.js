import React, { Component } from "react";
import fetch from "../../services/userServices";
import EventInfo from "../EventInfoDisplay";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AttendeeTable from "../attendeeTable/attendeeTable";
import Messenger from "../messenger/";
import InviteLink from "../inviteLink";
import moment from "moment";
// move this to a the pages folder!!
class EventManager extends Component {
  state = {
    event_id: this.props.match.params.id,
    isToday: false
  };

  componentDidMount() {
    this.loadEventData();
  }
  loadEventData = async () => {
    const eventData = await fetch.loadEventData(this.state.event_id);
    this.setState(eventData.data);
    this.setState({
      isToday:
        moment(eventData.data.event_date).format("DD") ===
        moment(new Date()).format("DD")
          ? false
          : true
    });
  };

  approveAttendee = async id => {
    const eventData = await fetch.approveAttendee(this.state.event_id, id);
    this.setState(eventData.data);
  };
  revokeAttendee = async id => {
    const eventData = await fetch.revokeAttendee(this.state.event_id, id);
    this.setState(eventData.data);
  };

  checkInAttendee = async id => {
    const response = await fetch.checkIn(id,this.state.event_id)
  };

  deleteFromEvent = async id => {
    // delete guest from event
  };

  handleTextReqFromTable = async (id, list) => {
    this.props.history.push(
      `${this.props.match.url}/communicate/text/${id}/${list}`
    );
  };
  handleEmailReqFromTable = async (id, list) => {
    this.props.history.push(
      `${this.props.location.pathname}/communicate/email/${id}/${list}`
    );
  };

  handlerDispatchMsg = async (event, recievers, type) => {
    event.preventDefault();
    event.persist();

    const dataToSend = {
      recievers: recievers,
      [event.target[0].name]: event.target[0].value,
      [event.target[1].name]: event.target[1].value
    };
    const test = await fetch.sendManyEmail(dataToSend);
    console.log(test, "HERE");
    this.props.history.push(this.props.match.url);
  };

  render() {
    // Move to own file later!
    const DataTables = () =>
      this.state.isToday ? (
        <div>
          <EventInfo {...this.state} />
          <h4 className="mt-3">Invite Link:</h4>
          <InviteLink event_id={this.state.event_id} />
          <AttendeeTable
            title="Awaiting Approval"
            whichList={this.state.event_signed_up}
            toggle={this.approveAttendee}
            sendText={this.handleTextReqFromTable}
            sendEmail={this.handleEmailReqFromTable}
            list="event_signed_up"
            btn={"Approve"}
          />
          <AttendeeTable
            title="Attending"
            whichList={this.state.event_attendees_approved}
            toggle={this.revokeAttendee}
            sendText={this.handleTextReqFromTable}
            sendEmail={this.handleEmailReqFromTable}
            btn={"Revoke"}
            list="event_attendees_approved"
          />
        </div>
      ) : (
        <div>
          <AttendeeTable
            title="Check In"
            whichList={this.state.event_attendees_approved}
            toggle={this.checkInAttendee}
            sendText={this.handleTextReqFromTable}
            sendEmail={this.handleEmailReqFromTable}
            btn={"Check In"}
            list="event_attendees_approved"
            {...this.state}
          />
        </div>
      );

    return (
      <Switch>
        <Route
          path={this.props.match.url + "/communicate/:type/:user/:list"}
          render={routeProps => (
            <Messenger
              {...routeProps}
              {...this.state}
              dispatchMsg={this.handlerDispatchMsg}
            />
          )}
        />
        <Route
          path={this.props.match.url + "/"}
          render={routeProps => <DataTables />}
        />
      </Switch>
    );
  }
}

export default EventManager;
