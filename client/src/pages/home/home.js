import React, { Component } from "react";
import OauthBtns from "../../components/socialBtns";
import { Container, Row, Jumbotron, Button } from "reactstrap";
import utils from "../../services/utils";
import ls from "../../services/localStorage";
import {Link, Route} from 'react-router-dom';


class Home extends Component {
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
      <Jumbotron fluid className="text-center col-12" style={JumbotronStyles}>
      <h2>Evently</h2>
      <p>The best event management app.</p>
      <Button>Get Started</Button>
    </Jumbotron>
      <Container> 
        <Row className="d-flex justify-content-around">
        <OauthBtns msg="Sign Up" />
          <OauthBtns msg="Log In" />
        </Row>

      </Container>
      </div>
    );
  }
}

const JumbotronStyles = {
  backgroundImage: "url('https://images.pexels.com/photos/273011/pexels-photo-273011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  filter: 'brightness(90%)',
  color: '#ffffff'
}



export default Home;
