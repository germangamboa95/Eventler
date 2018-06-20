import React, { Component } from "react";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardHeader
} from "reactstrap";
import fetch from "../../services/serverApi";

class InviteBlaster extends Component {
  state = {
    emails: [],
    emailsInput: ""
  };

  onChangeEmail = e => {
    e.persist();
    const value = e.target.value.trim();
    this.setState({ emailsInput: value });
    if (value.includes(",")) {
      this.setState({
        emails: [...this.state.emails, value],
        emailsInput: ""
      });
    }
  };

  handlerDispatchMsg = async (event, recievers, type) => {
    console.log(this.props);
    event.preventDefault();
    event.persist();
    if (type === "email") {
      const dataToSend = {
        recievers: recievers,
        title: "You have been invited!",
        msg: `<a href="${window.location.origin}/joinEvent/${
          this.props.event_id
        }">You have been invited to ${this.props.event_name}</a>`
      };
      await fetch.sendInvite(dataToSend);
      this.props.toggle();
    } else {
      const dataToSend = {
        recievers: recievers,
        title: "You have been invited!",
        msg: `This is an invitation to ${
          this.props.event_name
        }. Please follow the link to sign up. ${
          window.location.origin
        }/joinEvent/${this.props.event_id} `
      };
      await fetch.sendTextInvite(dataToSend);
      this.props.toggle();
    }
  };

  render() {
    const emailsInBadges = () => {
      return this.state.emails.map((email, id) => {
        return (
          <span key={id} className="badge badge-info mx-1">
            {email}
          </span>
        );
      });
    };
    return (
      <Card className="m-0">
        <h2 className="text-center color py-2">
          {this.props.title} Invite Link
        </h2>

        <Form
          onSubmit={e =>
            this.handlerDispatchMsg(
              e,
              this.state.emails,
              this.props.title.toLowerCase()
            )
          }
          className="m-5"
        >
          <FormGroup id="emails">
            {emailsInBadges()}
            <Input
              placeholder={`Type ${this.props.title}s separated by comas...`}
              value={this.state.emailsInput}
              onChange={this.onChangeEmail.bind(this)}
              type={this.props.type}
              name={this.props.title}
              style={{
                border: "none",
                borderBottom: "1px solid #9e9e9e",
                borderRadius: "0",
                marginTop: "1em"
              }}
             
            />
          </FormGroup>
          <p>
            An {this.props.title} will be send out the people included on the
            list once submit is clicked.
          </p>
          <Button>Submit</Button>
        </Form>
      </Card>
    );
  }
}

export default InviteBlaster;
