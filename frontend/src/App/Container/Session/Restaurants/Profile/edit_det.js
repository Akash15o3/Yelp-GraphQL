import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";
import { updateRestaurantProfile } from "../../../../../mutation/mutation";
import { graphql, compose } from "react-apollo";
class edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setShow: false,
      prof_pic: "",
      dish_pic: "",
      id: "",
      rest_name: "",
      location: "",
      description: "",
      timing: "",
      contact: "",
      website: "",
      title: "",
      cat: "",
      price: "",
      reviews: "",
      email: "",
    };
  }
  id = (e) => {
    this.setState({
      id: e.target.value,
    });
  };
  restName = (e) => {
    this.setState({
      rest_name: e.target.value,
    });
  };

  location = (e) => {
    this.setState({
      location: e.target.value,
    });
  };

  desc = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  timing = (e) => {
    this.setState({
      timing: e.target.value,
    });
  };

  contact = (e) => {
    this.setState({
      contact: e.target.value,
    });
  };

  website = (e) => {
    this.setState({
      website: e.target.value,
    });
  };

  email = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  reviews = (e) => {
    this.setState({
      reviews: e.target.value,
    });
  };
  updatePers = async (e) => {
    e.preventDefault();
    //set the with credentials to true
    let mutationResponse = await this.props.updateRestaurantProfile({
      variables: {
        rest_name: this.state.rest_name,
        location: this.state.location,
        description: this.state.description,
        timing: this.state.timing,
        contact: this.state.contact,
        website: this.state.website,
        email: this.state.email,
        reviews: this.state.reviews,

        id: this.state.id,

        _id: localStorage.getItem("_id"),
      },
    });
    let response = mutationResponse.data.updateRestaurantProfile;
    if (response) {
      if (response.status === "200") {
        alert("Successfully Updated");
        this.handleClose();
      } else {
        console.log("unsuccessful");
      }
    }
  };
  handleClose = () => {
    this.props.handleClose();
    this.setState({ setShow: false });
  };
  handleShow = () => this.setState({ setShow: true });

  componentDidUpdate(prevProps) {
    if (prevProps.show != this.props.show) {
      this.setState({
        setShow: this.props.show,
        rest_name: this.props.data.name,
        location: this.props.data.location,
        description: this.props.data.description,
        timing: this.props.data.timing,
        contact: this.props.data.contact,
        website: this.props.data.website,
        email: this.props.data.email,
        id: this.props.data.restaurantID,
        reviews: this.props.data.reviews,
      });
    }
  }

  render() {
    console.log(this.state.data);
    return (
      <Modal show={this.state.setShow} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: "scroll" }}>
          <Form classname="top-10">
            <Form.Group controlId="formCompanyName">
              <Form.Label>Restaurant Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Restaurant Name"
                value={this.state.rest_name}
                onChange={this.restName}
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Location"
                value={this.state.location}
                onChange={this.location}
              />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Timing</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Type"
                value={this.state.timing}
                onChange={this.timing}
              />
            </Form.Group>
            <Form.Group controlId="formCnt">
              <Form.Label>Contact Info </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Contact Info"
                value={this.state.contact}
                onChange={this.contact}
              />
            </Form.Group>

            <Form.Group controlId="formWebsite">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Website"
                value={this.state.website}
                onChange={this.website}
              />
            </Form.Group>

            <Form.Group controlId="formWebsite">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={this.state.description}
                onChange={this.desc}
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
  graphql(updateRestaurantProfile, { name: "updateRestaurantProfile" })
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
