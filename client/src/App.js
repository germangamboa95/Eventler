import React, { Component } from "react";
import { Button } from "reactstrap";
import Navbars from "./components/navbar/navbar";
import WelcomeCard from "./components/welcomeCard/card";


import userService from "./services/userServices";

class App extends Component {
  state = {
    loggedIn: false
  };

  componentDidMount() {
    window.gapi.signin2.render("here", {
      scope: "profile",
      width: 200,
      height: 50,
      longtitle: false,
      theme: "dark",
      onsuccess: async e => {
        let x = await userService.test(e.getAuthResponse().id_token, "owner");
        console.log(e.getAuthResponse().id_token);
        console.log(x);
      },
      onfailure: () => console.log("fail")
    });
  }

  ello = () => {
    const x = window.gapi.auth2.getAuthInstance();
    x.signOut().then(function() {
      console.log("User signed out.");
    });
  };

  render() {
    return (
      <div>
        <Navbars />
        <div className="container">
          <WelcomeCard />
          <Button onClick={this.ello}>asdf</Button>
        </div>
      </div>
    );
  }
}

export default App;
