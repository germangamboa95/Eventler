import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./containers/home-container";
import Dashboard from "./containers/dashboard-container";
import Navbar from "./containers/nav-container";
import NotFound from "./components/404";
import ls from "./services/localStorage";
import EventSignUp from "./containers/event-registration-container";

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
              path="/joinEvent/:id"
              render={(routeProps) => (
                <EventSignUp
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
