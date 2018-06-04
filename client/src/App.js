import React, { Component } from "react";
import { Button } from "reactstrap";
import Navbars from "./components/navbar/navbar";
import WelcomeCard from "./components/welcomeCard/card";


import userService from "./services/userServices";

class App extends Component {


  render() {
    return (
      <div>
        <Navbars />
        <div className="container">
          <WelcomeCard />
          <a href="https://www.facebook.com/"> German</a>
          <a href="http://localhost:3000/auth/google">Sign In with Google</a>
          <a href="http://localhost:3000/auth/facebook">Login with Facebook</a>
        </div>
      </div>
    );
  }
}

export default App;
