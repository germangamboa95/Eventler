import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import FacebookLogin from "react-facebook-login";

const responseFacebook = response => {
  console.log(response);
};

const componentClicked = response => {
  console.log(response);
};
ReactDOM.render(
  <FacebookLogin
    appId="191912984965599"
    autoLoad={true}
    fields="name,email,picture"
    onClick={componentClicked}
    callback={responseFacebook}
  />,
  document.getElementById("root")
);
registerServiceWorker();
