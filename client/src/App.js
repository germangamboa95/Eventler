import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/navbar";
import NotFound from "./pages/404";
import ls from "./services/localStorage";
import { Container } from "reactstrap";
import { withRouter } from "react-router-dom";

class App extends Component {
  state = {
    loggedIn: ls.useToken() ? true : false,
    userData: {}
  };

  //  Functions that allow app wide state update. Use carefully!
  updateUserData = obj => this.setState({ userData: obj });

  updateLoginState = state => this.setState({ loggedIn: state });

  render() {
    return (
      <Router>
        <div>
          <Navbar
            {...this.state}
            updateLoginState={this.updateLoginState}
            updateUserData={this.updateUserData}
          />
            <Switch>
              <Route
                path="/dashboard"
                render={routeProps => (
                  <Dashboard
                    {...routeProps}
                    {...this.state}
                    updateLoginState={this.updateLoginState}
                    updateUserData={this.updateUserData}
                  />
                )}
              />
              <Route
                exact
                path="/"
                render={routeProps => (
                  <Home
                    {...routeProps}
                    {...this.state}
                    updateLoginState={this.updateLoginState}
                    updateUserData={this.updateUserData}
                  />
                )}
              />
              <Route component={NotFound} />
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
