import React from "react";
import { Collapse, Navbar, NavbarToggler, Nav, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ls from "../../services/localStorage";

class Navbars extends React.Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

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
            <Link className="nav-item nav-link" to="/dashboard/create">
              Create Event
            </Link>
            <NavLink className="nav-item nav-link" onClick={this.logOut}>
              LogOut
            </NavLink>
          </Nav>
        );
      } else if (this.props.location.pathname === "/joinEvent") {
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
        <Navbar color="dark" dark expand="md" style={navStyle}>
          <Link
            className="navbar-brand"
            to={this.props.loggedIn ? "/dashboard" : "/"}
          >
            Eventler
          </Link>

          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {loggedIn()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const navStyle = {
  background: "linear-gradient(to left, #0f2027, #203a43, #2c5364)"
};

export default withRouter(Navbars);
