import React, { Component } from "react";
import { Container } from "reactstrap";
import fetch from "../../services/userServices";
import UserForm from "../../components/userInfoForm";
import ls from "../../services/localStorage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateEvent from "../../components/createEvent";
import DashboardContainer from "../../components/dashBoardContainer";
import NotFound from "../404/404";
import EventManager from "../../components/eventManager";

class Dashboard extends Component {
  state = {
    token: ls.useToken(),
    complete: ls.getState(),
    _id: ls.useId()
  };

  componentDidMount() {
    this.loadUserData();
  }

  componentDidUpdate() {
    if (this.props.location.hash === "#update") {
      this.loadUserData();
      this.props.history.push("/dashboard");
    }
  }

  loadUserData = async () => {
    const user = await fetch.getUserData(this.state._id);
    const events = await fetch.loadOwnedEvents(this.state._id);
    this.setState({
      first_name: user.data.first_name,
      last_name: user.data.last_name,
      email: user.data.email,
      cell: user.data.cell,
      events_owned: events.data[0].events_owned
    });
  };

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
    await fetch.updateUserData(this.state._id, dataToSend);
    ls.saveState(true);
    this.setState({
      complete: true
    });
  };

  handleManageEventReq = id =>
    this.props.history.push("/dashboard/event/manage/" + id);

  render() {
    const isComplete = () => {
      if (this.state.complete !== "false") {
        return (
          <Switch>
            <Route
              path={this.props.match.url + "/create"}
              render={routeProps => (
                <CreateEvent {...routeProps} {...this.state} />
              )}
            />
            <Route
              path={this.props.match.url + "/event/manage/:id"}
              render={routeProps => (
                <EventManager {...routeProps} {...this.state} />
              )}
            />

            <Route
              path={this.props.match.url + "/"}
              render={routeProps => (
                <DashboardContainer {...routeProps} {...this.state} ManageEventReq={this.handleManageEventReq} />
              )}
            />
          </Switch>
        );
      } else {
        return (
          <UserForm
            {...this.state}
            inputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
          />
        );
      }
    };
    return <Container>{isComplete()}</Container>;
  }
}

export default Dashboard;
