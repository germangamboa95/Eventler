import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import fetch from "../../services/userServices";
class CreateEvent extends Component {
  state = {
    event_name: "",
    event_date: new Date(),
    event_time: "",
    event_location: "",
    event_img: null,
    event_owners: this.props._id
  };

  onChange = event_date => this.setState({ event_date });
  onChange1 = time => this.setState({ time });

  handleSubmit = async e => {
    e.preventDefault();
    const eventData = {
      event_name: this.state.event_name,
      event_date: this.state.event_date,
      event_location: this.state.event_location,
      event_time: this.state.event_time,
      event_owners: this.props._id
    };
    const response = await fetch.createNewEvent(this.props._id, eventData);
    this.props.history.push("/dashboard/#update");
  };

  onChangeForm = e => {
    e.persist();
    let value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    });
  };

  render() {
    console.log(this.props);
    return (
      <div className="mt-5">
        <h2>Create New Event:</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="fname">Event Name:</Label>
            <Input
              onChange={this.onChangeForm.bind(this)}
              value={this.state.event_name}
              name="event_name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleTime">Time</Label>
            <Input
              onChange={this.onChangeForm.bind(this)}
              type="time"
              name="event_time"
              placeholder="time placeholder"
              value={this.state.event_time}
            />
          </FormGroup>
          <FormGroup>
            <Label className="d-block" for="exampleDate">
              Date:{" "}
            </Label>
            <DatePicker
              onChange={this.onChange}
              value={this.state.event_date}
            />
          </FormGroup>
          <FormGroup>
            <Label for="cell">Event Location:</Label>
            <Input
              onChange={this.onChangeForm.bind(this)}
              value={this.state.event_location}
              name="event_location"
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default CreateEvent;
