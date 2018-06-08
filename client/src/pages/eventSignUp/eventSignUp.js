import React, { Component } from "react";
import { Container } from "reactstrap";
import fetch from "../../services/userServices";
import SignUpForm from "../../components/userInfoForm";
import EventDisplay from "../../components/EventInfoDisplay";
import ThankYou from "../../components/thankYou";

class EventSignUp extends Component {
  state = {
    event_id: this.props.match.params.id,
    first_name: "",
    last_name: "",
    email: "",
    cell: "",
    done: false
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
      [event.target[0].name]: event.target[0].value,
      [event.target[1].name]: event.target[1].value,
      [event.target[2].name]: event.target[2].value,
      [event.target[3].name]: event.target[3].value
    };
    const test = await fetch.newUserForEvent(dataToSend);
    this.setState(test.data);
    const eventMsg = await fetch.signUpForEvent(
      this.state.event_id,
      test.data._id
    );
    console.log(test.data._id, 'eeeee');
    await fetch.sendConfirm(test.data._id,this.state.event_name)
    this.setState({ done: true})
    console.log(eventMsg);
  };

  render() {
    console.log(this.state);
    return (
      <Container>
        {!this.state.done ? (
          <div>
            <EventDisplay {...this.state} />
            <SignUpForm
              {...this.state}
              inputChange={this.handleInputChange}
              handleSubmit={this.handleSubmit}
            />
          </div>
        ) : (
          <ThankYou />
        )}
      </Container>
    );
  }
}

export default EventSignUp;
