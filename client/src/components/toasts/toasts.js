import React, { Component } from "react";
import { Alert } from "reactstrap";

class Toast extends Component {
  state = {
    show: false,
    msg: "Hello Word"
  };
  toggleToastRender = () => {
    return this.state.show ? (
      <Alert color="primary">{this.state.msg}</Alert>
    ) : (
      ""
    );
  };
  toggleToastTrigger = msg => {
    this.setState(
      {
        show: true,
        msg: msg
      },
      () => {
        setTimeout(() => this.setState({ show: false }), 2000);
      }
    );
  };
  render() {
    const childWithProp = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        Toast: this.toggleToastTrigger
      });
    });
    return (
      <div>
        {this.toggleToastRender()}
        {childWithProp}
      </div>
    );
  }
}

export default Toast;
