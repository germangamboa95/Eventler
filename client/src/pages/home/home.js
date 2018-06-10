import React, { Component } from "react";
import OauthBtns from "../../components/socialBtns";
import { Container, Row, Jumbotron } from "reactstrap";
import utils from "../../services/utils";
import ls from "../../services/localStorage";
import { Button, Modal, ModalBody } from "reactstrap";
import "./home.css";
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
    if (this.props.location.hash) {
      this.toggle();
      this.props.location.hash = "";
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
        <Container
          fluid
          className="text-center p-0 home"
          style={{
            background:"linear-gradient(to right, #1f1c2c, #928dab)",
            color: '#fff'
          }}
        >
          <section className="hero d-flex justify-content-center flex-column">
            <Row className="d-flex justify-content-center">
              <div className="col-md-6">
                <h1>Evently</h1>
                <p>The best event management app.</p>
              </div>
              <div className="col-md-4 sign-u mx-sm-3 mx-xs-5 mx-5">
                <OauthBtns msg="Sign Up" />
              </div>
            </Row>
          </section>
          <section className="anti-hero w-75 mx-auto">
            <h2 className="py-5">Every Step</h2>
            <Row>
              <div className="col-md-4 text-center">
              <h3>Manage Multiple Events</h3>
              <i className="far fa-calendar-alt fa-5x"></i>
              <p className="p-copy mx-auto mt-2">With Evently you can manage multiple events in one spot. No more switching apps.</p>
              </div>
              <div className="col-md-4 text-center">
              <h3>Boundless Communication</h3>
              <i className="far fa-envelope fa-5x"></i>
              <p className="p-copy mx-auto mt-2">Stay in touch with all your guests via text or E-mail.</p>
              </div>
              <div className="col-md-4 text-center">
              <h3>Manage Multiple Events</h3>
              <i className="fas fa-chart-pie fa-5x"></i>
              <p className="p-copy mx-auto mt-2">With Evently you can manage multiple events in one spot. No more switching apps.</p>
              </div>
        
            </Row>
          </section>
        </Container>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          
        >
          <ModalBody>
            <OauthBtns msg="Log In" />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const JumbotronStyles = {};

export default Home;
