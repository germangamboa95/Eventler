import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/navbar";
import NotFound from "./pages/404";

import { Container } from "reactstrap";
class App extends Component {
  state = {
    loggedIn: false,
    userData: {}
  };

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
          <Container>
            <Switch>
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
              <Route
                exact
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
              <Route component={NotFound} />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
