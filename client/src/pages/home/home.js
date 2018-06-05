import React, { Component } from "react";
import OauthBtns from "../../components/socialBtns";
import { Container, Row} from "reactstrap";
import utils from '../../services/utils';
import ls from '../../services/localStorage';


class App extends Component {

  componentWillMount() {
    if(utils.getParams('token')){
        ls.saveToken(utils.getParams('token'));
        ls.saveId(utils.getParams('ui'));
        ls.saveState(utils.getParams('done'));
        this.props.updateLoginState(true); 
        this.props.history.push('/dashboard');
    } 
}
  render() {
    return (
      <Container>
        <Row className="d-flex justify-content-around">
          <OauthBtns msg="Sign Up"/>
          <OauthBtns msg="Log In"/>
        </Row>
      </Container>
    );
  }
}

export default App;
