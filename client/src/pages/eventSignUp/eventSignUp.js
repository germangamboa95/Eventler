import React, { Component } from "react";
import { Container, Row, Col, Card } from "reactstrap";
import fetch from "../../services/userServices";
import UserForm from "../../components/userInfoForm";
import ls from "../../services/localStorage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateEvent from "../../components/createEvent";
import DashboardContainer from "../../components/dashBoardContainer";
import SignUpForm from "../../components/userInfoForm";
import EventDisplay from '../../components/EventInfoDisplay'
class EventSignUp extends Component {
  state = {
    event_id: this.props.match.params.id,
    first_name: "German",
    last_name: "",
    email: "",
    cell: ""
  };

  async componentDidMount() {
    let response = await fetch.loadEventData(this.state.event_id);
    response = response.data;

    this.setState(response);
  }

  handleInputChange = event => {
    event.persist();
    let value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    event.persist();
    const dataToSend = {
      [event.target[0].name] : event.target[0].value,
      [event.target[1].name] : event.target[1].value,
      [event.target[2].name] : event.target[2].value,
      [event.target[3].name] : event.target[3].value
    }
    const test = await fetch.newUserForEvent(dataToSend);
    this.setState(test.data);
    const eventMsg = await fetch.signUpForEvent(this.state.event_id, test.data._id);
    console.log(eventMsg)
  }


  render() {
    console.log(this.state);
    return (
      <Container>
        <EventDisplay {...this.state}/>
        <SignUpForm {...this.state}   inputChange={this.handleInputChange} handleSubmit={this.handleSubmit}/>
      </Container>
    );
  }
}

export default EventSignUp;
