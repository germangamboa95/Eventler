import React, { Component } from "react";
import fetch from "../../services/userServices";
import EventInfo from "../EventInfoDisplay";

class EventManager extends Component {
  state = {
    event_id: this.props.match.params.id
  };
  componentDidMount() {
    this.loadEventData();
  }

  loadEventData = async id => {
    const eventData = await fetch.loadEventData(this.state.event_id);
    this.setState(eventData.data);
  };

  render() {
      console.log(this.state)
    return (
      <div>
        <EventInfo {...this.state} />
        <AttendeeTable {...this.state} />
      </div>
    );
  }
}

// Move to own file!!!
const AttendeeTable = props => {
    if(props.event_signed_up) {
        const awaitingApproval = props.event_signed_up.map(item => <h1>{item.first_name}</h1>)

        return awaitingApproval
    } else {
        return <hr/>;
    }
}

export default EventManager;
