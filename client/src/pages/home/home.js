import React, { Component } from "react";
import OauthBtns from "../../components/socialBtns";
import { Container, Row, Jumbotron } from "reactstrap";
import utils from "../../services/utils";
import ls from "../../services/localStorage";
import { Link, Route } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class Home extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  componentDidUpdate() {
    // Reading route hash to check if modal should open.
    if(this.props.location.hash) {
      this.toggle()
      this.props.location.hash = '';
    }
  }
  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.history.push("/dashboard");
    }

    if (utils.getParams("token")) {
      ls.saveToken(utils.getParams("token"));
      ls.saveId(utils.getParams("ui"));
      ls.saveState(utils.getParams("done"));
      this.props.updateLoginState(true);
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div>
        <Jumbotron fluid className="text-center" style={JumbotronStyles}>
          <h2>Evently</h2>
          <p>The best event management app.</p>
          <Button>Get Started</Button>
          <Container>
          <Row className="d-flex justify-content-around">
            <OauthBtns msg="Sign Up" />
          </Row>
        </Container>
        </Jumbotron>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalBody>
            <OauthBtns msg="Log In" />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const JumbotronStyles = {
  
};

export default Home;
