import React, { Component } from "react";
import fetch from "../../services/userServices";
import EventInfo from "../EventInfoDisplay";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AttendeeTable from "../attendeeTable/attendeeTable";
import Messenger from "../messenger/";
import InviteLink from "../inviteLink";
import moment from 'moment';
// move this to a the pages folder!!
class EventManager extends Component {
  state = {
    event_id: this.props.match.params.id,
 
  };

  
  componentDidMount() {
    this.loadEventData();
  }
  loadEventData = async () => {
    const eventData = await fetch.loadEventData(this.state.event_id);
    this.setState(eventData.data);
  };

  approveAttendee = async id => {
    const eventData = await fetch.approveAttendee(this.state.event_id, id);
    this.setState(eventData.data);
  };
  revokeAttendee = async id => {
    const eventData = await fetch.revokeAttendee(this.state.event_id, id);
    this.setState(eventData.data);
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
    console.log(test, 'HERE')
    this.props.history.push(this.props.match.url);
  };
  isToday = ( ) => {

  

    return (moment(this.state.event_date).format("D")  === moment(Date()).format("D") )? false : true
  

  }
  render() {
    // Move to own file later!
    const DataTables = () => (
      (this.isToday())?<div>
        <EventInfo {...this.state} />
        <h4 className="mt-3">Invite Link:</h4>
        <InviteLink event_id={this.state.event_id}/>
        <AttendeeTable
          title="Awaiting Approval"
          approveAttendee={this.approveAttendee}
          whichList={this.state.event_signed_up}
          toggle={this.approveAttendee}
          sendText={this.handleTextReqFromTable}
          sendEmail={this.handleEmailReqFromTable}
          list="event_signed_up"
          btn={"Approve"}
    
        />
        <AttendeeTable
          title="Attending"
          approveAttendee={this.approveAttendee}
          whichList={this.state.event_attendees_approved}
          toggle={this.revokeAttendee}
          sendText={this.handleTextReqFromTable}
          sendEmail={this.handleEmailReqFromTable}
          btn={"Revoke"}
          list="event_attendees_approved"
        />
        </div>
        :
        <div>
            <AttendeeTable
          title="Check In"
          approveAttendee={this.approveAttendee}
          whichList={this.state.event_attendees_approved}
          toggle={this.revokeAttendee}
          sendText={this.handleTextReqFromTable}
          sendEmail={this.handleEmailReqFromTable}
          btn={"Revoke"}
          list="event_attendees_approved"
      
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
