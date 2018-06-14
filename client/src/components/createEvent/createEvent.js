import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input,Card } from "reactstrap";
import DateTimePicker from "react-datetime-picker";
import fetch from "../../services/userServices";
import Dropzone from "react-dropzone";
import request from "superagent";
import "./component.css";
const CLOUDINARY_UPLOAD_PRESET = "nyk3aosr";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dtxifoif4/image/upload";

class CreateEvent extends Component {
  state = {
    event_name: "",
    event_date: new Date(),
    event_location: "",
    event_img: undefined,
    event_owners: this.props._id,
    event_desc: "",
    uploadedFileCloudinaryUrl: undefined,
    spin: ""
  };

  async componentDidMount() {
    if(this.props.event_id) {
      const eventData = await fetch.loadEventData(this.props.event_id);
      this.setState(eventData.data, () => console.log(this.state));
    }

  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }
  handleImageUpload(file) {
    this.setState({ spin: "spinner-1" });
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== "") {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url,
          spin: ""
        });
      }
    });
  }

  onChange = event_date => this.setState({ event_date });
  onChange1 = time => this.setState({ time });

  handleSubmit = async e => {
    e.preventDefault();
    const eventData = {
      event_name: this.state.event_name,
      event_date: this.state.event_date,
      event_location: this.state.event_location,
      event_desc: this.state.event_desc,
      event_owners: this.props._id,
      event_img: this.state.uploadedFileCloudinaryUrl
    };
    if(this.state._id) {
      console.log(eventData)
       const x = await fetch.updateEventData(eventData ,this.state._id)
       console.log(x);
       this.props.toggle()
    } else {
      let x = await fetch.createNewEvent(this.props._id, eventData);
      this.props.history.push("/dashboard/#update");
    }
   

    
  };

  onChangeForm = e => {
    e.persist();
    let value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    });
  };

  render() {
    console.log(this.props)
    return (
      <Card className="rounded">
        <h2 className="color rounded-top text-center py-2">{this.props.title}:</h2>
        <Form className ="m-5" onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="fname">Event Name:</Label>
            <Input
              onChange={this.onChangeForm.bind(this)}
              value={this.state.event_name}
              name="event_name"
            />
          </FormGroup>
          <FormGroup>
            <Label className="d-block" for="exampleDate">
              Date &amp; Time(24hr):{" "}
            </Label>
            <DateTimePicker
              onChange={this.onChange}
              value={new Date(this.state.event_date)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="cell">Event Location:</Label>
            <Input
              onChange={this.onChangeForm.bind(this)}
              value={this.state.event_location}
              name="event_location"
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleTime">Description:</Label>
            <Input
              onChange={this.onChangeForm.bind(this)}
              type="textarea"
              name="event_desc"
              placeholder="A short description about the event..."
              value={this.state.event_desc}
            />
          </FormGroup>
          <FormGroup>
            <Label className="d-block" for="cell">
              Event Image:
            </Label>
            <Dropzone
              className={
                "h-auto border drop-z rounded d-inline-block position-relative " +
                this.state.spin
              }
              style={{
                maxWidth: "200px",
                minHeight: "100px",
                minWidth: "100px",
              }}
              multiple={false}
              accept="image/*"
              onDrop={this.onImageDrop.bind(this)}
            >
              {(!this.state.event_img && !this.state.uploadedFileCloudinaryUrl)? (
                this.state.spin === "spinner-1" ? (
                  <div />
                ) : (
                  <p className={"my-auto p-2"}>
                    Drop an image or click to select a file to upload.
                  </p>
                )
              ) : (
                <img
                  className="img-fluid"
                  src={this.state.event_img || this.state.uploadedFileCloudinaryUrl}
                  alt="Uploaded content."
                />
              )}
            </Dropzone>
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </Card>
    );
  }
}

export default CreateEvent;
