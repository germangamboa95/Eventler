import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import fetch from "../../services/userServices";
import UserForm from "../../components/userInfoForm";
import ls from '../../services/localStorage';
class Dashboard extends Component {
  state = {
    token: ls.useToken(),
    id: ls.useId(),
    complete: ls.getState()
  };

  componentDidMount() {
    this.loadUserData();
  }

  loadUserData = async () => {
    const user = await fetch.getUserData(this.state.id);
    this.props.updateUserData(user.data);
  };

  render() {
    return (
      <Container>
        <UserForm {...this.props.userData}/>
      </Container>
    );
  }
}

export default Dashboard;
