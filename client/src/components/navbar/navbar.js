import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ls from "../../services/localStorage";

class Navbars extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logOut = () => {
    ls.clear();
    this.props.updateUserData({});
    this.props.updateLoginState(false);
    this.props.history.push("/");
  };

  render() {
    const loggedIn = () => {
      if (this.props.loggedIn) {
        return (
          <Nav className="ml-auto" navbar>
            <Link className="nav-item nav-link" to="/dashboard">
              Dashboard
            </Link>
            <Link className="nav-item nav-link" to='/dashboard/create'>
              Create Event
            </Link>
            <NavLink className="nav-item nav-link" onClick={this.logOut}>
              LogOut
            </NavLink>
          </Nav>
        );
      } else if(this.props.location.pathname === '/joinEvent'){
      
        return (
          <Nav className="ml-auto" navbar>
            <Link className="nav-item nav-link" to="/">
              Home
            </Link>

            <a className="nav-item nav-link" href="http://germangamboa.com">
            About Creator
            </a>
          </Nav>
        );
      } else {
        return (
          <Nav className="ml-auto" navbar>
            <Link className="nav-item nav-link" to="/#modal">
              Login
            </Link>

            <a className="nav-item nav-link" href="http://germangamboa.com">
            About Creator
            </a>
          </Nav>
        );
      }
    };

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <Link className="navbar-brand" to={(this.props.loggedIn)?'/dashboard':'/'}>Evently</Link>

          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {loggedIn()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Navbars);
