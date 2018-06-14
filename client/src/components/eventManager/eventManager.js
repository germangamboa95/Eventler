import React, { Component } from "react";
import fetch from "../../services/userServices";
import EventInfo from "../EventInfoDisplay";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AttendeeTable from "../attendeeTable/attendeeTable";
import Messenger from "../messenger/";
import InviteLink from "../inviteLink";
import moment from "moment";
import CheckInTable from "../checkInTable";
import userServices from "../../services/userServices";
import { Row } from "reactstrap";
import EventOptions from "../eventOptions";


// move this to a the pages folder!!
class EventManager extends Component {
  state = {
    event_id: this.props.match.params.id,
    isToday: false,
    modal: false,
    componentInModal: '<h1>hello</h1>',
    componentInModalProps: ""
  };

  toggle = (whichComp, props ) => {
      console.log(this)
      const x = (typeof whichComp != 'object')? whichComp : () => '';
      this.setState({
        modal: !this.state.modal,
        componentInModal: x,
        componentInModalProps: props
      });
      this.loadEventData();
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
    const response = await fetch.checkIn(id, this.state.event_id);
    this.setState({
      event_attendees_checkedIn: response.data.event_attendees_checkedIn
    });
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
    const serverResponse = (type === 'email')? await fetch.sendManyEmail(dataToSend): await fetch.sendText(dataToSend);
    console.log(serverResponse);
    this.props.history.push(this.props.match.url);
  };

  handlerDeleteGuest = async (id, list) => {
    const response = await userServices.deleteGuest(
      id,
      this.state.event_id,
      list
    );

    this.loadEventData();
  };

  render() {
    // Move to own file later!

    const DataTables = () =>
      this.state.isToday ? (
        <div>
          <Row>
            <div className="col-md-6">
              <EventInfo {...this.state} />
            </div>
            <div className="col-md-6">
              <EventOptions
                renderComp={this.state.componentInModal}
                renderCompProps={this.state.componentInModalProps}
                modal={this.state.modal}
                toggle={this.toggle}
                {...this.state}
                {...this.props}
                dispatchMsg={this.handlerDispatchMsg}
              />
            </div>
          </Row>
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
            deleteGuest={this.handlerDeleteGuest}
          />
          <AttendeeTable
            title="Attending"
            whichList={this.state.event_attendees_approved}
            toggle={this.revokeAttendee}
            sendText={this.handleTextReqFromTable}
            sendEmail={this.handleEmailReqFromTable}
            btn={"Revoke"}
            list="event_attendees_approved"
            deleteGuest={this.handlerDeleteGuest}
          />
        </div>
      ) : (
        <div>
          <CheckInTable
            title="Check In"
            whichList={this.state.event_attendees_approved}
            toggle={this.checkInAttendee}
            sendText={this.handleTextReqFromTable}
            sendEmail={this.handleEmailReqFromTable}
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
