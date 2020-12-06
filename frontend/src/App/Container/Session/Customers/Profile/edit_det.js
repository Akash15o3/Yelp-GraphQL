import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";
import { updateCustomerProfile } from "../../../../../mutation/mutation";
import { graphql, compose } from "react-apollo";
class edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setShow: false,
      prof_pic: "",
      customerID: "",
      fname: "",
      pass: "",
      lname: "",
      email: "",
      dateofbirth: "",
      city: "",
      State: "",
      country: "",
      phonenumber: "",
      nickname: "",
      yelpingsince: "",
      thingsilove: "",
      about: "",
      findmein: "",
      myblog: "",
      file: null,
      backendnProfName: "",
    };
    // this.onFormSubmitPicture = this.onFormSubmitPicture.bind(this);
    // this.onChangePicture = this.onChangePicture.bind(this);
  }

  customerID = (e) => {
    this.setState({
      customerID: e.target.value,
    });
  };
  fnameevent = (e) => {
    this.setState({
      fname: e.target.value,
    });
  };

  lname = (e) => {
    this.setState({
      lname: e.target.value,
    });
  };

  dateofbirth = (e) => {
    this.setState({
      dateofbirth: e.target.value,
    });
  };

  city = (e) => {
    this.setState({
      city: e.target.value,
    });
  };

  State = (e) => {
    this.setState({
      State: e.target.value,
    });
  };

  country = (e) => {
    this.setState({
      country: e.target.value,
    });
  };

  email = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  phonenumber = (e) => {
    this.setState({
      phonenumber: e.target.value,
    });
  };
  nickname = (e) => {
    this.setState({
      nickname: e.target.value,
    });
  };

  yelpingsince = (e) => {
    this.setState({
      yelpingsince: e.target.value,
    });
  };

  thingsilove = (e) => {
    this.setState({
      thingsilove: e.target.value,
    });
  };

  about = (e) => {
    this.setState({
      about: e.target.value,
    });
  };

  findmein = (e) => {
    this.setState({
      findmein: e.target.value,
    });
  };

  myblog = (e) => {
    this.setState({
      myblog: e.target.value,
    });
  };
  pass = (e) => {
    this.setState({
      pass: e.target.value,
    });
  };

  updatePers = async (e) => {
    e.preventDefault();
    let mutationResponse = await this.props.updateCustomerProfile({
      variables: {
        fname: this.state.fname,
        lname: this.state.lname,
        dateofbirth: this.state.dateofbirth,
        city: this.state.city,
        State: this.state.State,
        country: this.state.country,
        phonenumber: this.state.phonenumber,
        nickname: this.state.nickname,
        yelpingsince: this.state.yelpingsince,
        thingsilove: this.state.thingsilove,
        about: this.state.about,
        findmein: this.state.findmein,
        myblog: this.state.myblog,
        email: this.state.email,
        pass: this.state.pass,
        // customerID: this.state.customerID,
        //     prof_pic: this.state.prof_pic,
        _id: localStorage.getItem("_id"),
      },
    });
    let response = mutationResponse.data.updateCustomerProfile;
    if (response) {
      if (response.status === "200") {
        alert("Successfully Updated");
        this.handleClose();
      } else {
        console.log("unsuccessful");
      }
    }
    this.setState({ setShow: false });
  };

  handleClose = () => {
    this.props.handleClose();
    this.setState({ setShow: false });
  };
  handleShow = () => this.setState({ setShow: true });

  componentDidUpdate(prevProps) {
    if (prevProps.show !== this.props.show)
      this.setState({
        setShow: this.props.show,
        pass: this.props.data.pass,
        fname: this.props.data.fname,
        lname: this.props.data.lname,
        dateofbirth: this.props.data.dateofbirth,
        city: this.props.data.city,
        State: this.props.data.State,
        country: this.props.data.country,
        phonenumber: this.props.data.phonenumber,
        nickname: this.props.data.nickname,
        yelpingsince: this.props.data.yelpingsince,
        thingsilove: this.props.data.thingsilove,
        about: this.props.data.about,
        findmein: this.props.data.findmein,
        myblog: this.props.data.myblog,
        // customerID: this.props.data.customerID,
        email: this.props.data.email,
        // prof_pic: this.props.data.prof_pic,
      });
  }

  render() {
    console.log(this.state.data);
    return (
      <Modal show={this.state.setShow} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: "scroll" }}>
          <Form className="top-10">
            <Form.Group controlId="formCompanyName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={this.state.fname}
                onChange={this.fnameevent}
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                value={this.state.lname}
                onChange={this.lname}
              />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Nickname"
                value={this.state.nickname}
                onChange={this.nickname}
              />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={this.state.pass}
                onChange={this.pass}
              />
            </Form.Group>
            <Form.Group controlId="formCnt">
              <Form.Label>Contact Info </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Contact Info"
                value={this.state.phonenumber}
                onChange={this.phonenumber}
              />
            </Form.Group>

            <Form.Group controlId="formWebsite">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={this.state.city}
                onChange={this.city}
              />
            </Form.Group>

            <Form.Group controlId="formWebsite">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter State"
                value={this.state.State}
                onChange={this.State}
              />
            </Form.Group>

            <Form.Group controlId="formCompanyName">
              <Form.Label>First Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country"
                value={this.state.country}
                onChange={this.country}
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Date of Birth"
                value={this.state.dateofbirth}
                onChange={this.dateofbirth}
              />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Yelping Since</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Yelping since"
                value={this.state.yelpingsince}
                onChange={this.yelpingsince}
              />
            </Form.Group>
            <Form.Group controlId="formCnt">
              <Form.Label>Things I Love</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Things I Love"
                value={this.state.thingsilove}
                onChange={this.thingsilove}
              />
            </Form.Group>

            <Form.Group controlId="formWebsite">
              <Form.Label>Find me in</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Find me in"
                value={this.state.findmein}
                onChange={this.findmein}
              />
            </Form.Group>
            <Form.Group controlId="formCnt">
              <Form.Label>My Blog</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter My Blog"
                value={this.state.myblog}
                onChange={this.myblog}
              />
            </Form.Group>

            <Form.Group controlId="formWebsite">
              <Form.Label>About</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Enter About"
                value={this.state.about}
                onChange={this.about}
              />
            </Form.Group>
            <Form.Group controlId="formFile">
              <Form.Control
                name="prof_pic"
                type="file"
                onChange={this.handleFileUpload}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={this.updatePers}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default compose(
  graphql(updateCustomerProfile, { name: "updateCustomerProfile" })
)(edit);
// <Form.Group controlId="formEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter email"
//                 value={this.state.email}
//                 onChange={this.email}
//               />
//             </Form.Group>

// <form onSubmit={this.onFormSubmitPicture}>
//             <h4>Profile Picture Upload</h4>
//             <input type="file" name="myImage" onChange={this.onChangePicture} />
//             <button type="submit">Upload</button>
//           </form>
