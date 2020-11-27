import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { CustomerType } from "../../../../actions";

class signupform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantID: "",
      cname: "",
      location: "",
      email: "",
      pass: "",
      error: "",
      auth: true,
    };
  }
  ridEventHandler = (e) => {
    this.setState({
      restaurantID: e.target.value,
    });
  };
  rnameEventHandler = (e) => {
    this.setState({
      cname: e.target.value,
    });
  };

  locationEventHandler = (e) => {
    this.setState({
      location: e.target.value,
    });
  };

  passEventHandler = (e) => {
    this.setState({
      pass: e.target.value,
    });
  };

  emailEventHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  submitForm = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      restaurantID: this.state.restaurantID,
      cname: this.state.cname,
      location: this.state.location,
      email: this.state.email,
      pass: this.state.pass,
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/signuprest", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            error: "",
            authFlag: true,
          });
          alert("Successfully Created! Please Conitnue to Login");
        } else {
          this.setState({
            error:
              "<p style={{color: red}}>Please enter correct credentials</p>",
            authFlag: false,
          });
        }
      })
      .catch((e) => {
        this.setState({
          error: "Please enter correct credentials" + e,
        });
      });
  };

  render() {
    return (
      <div className=" container form-cont">
        <Form className="signup-form">
          <h2>Create New Account</h2>
          <p>
            For Customer please click the link{" "}
            <Link
              to="/signup"
              onClick={() => this.props.dispatch(CustomerType())}
            >
              here
            </Link>
          </p>
          <Form.Group controlId="formGridCName">
            <Form.Label>Restaurant ID</Form.Label>
            <Form.Control
              type="text"
              onChange={this.ridEventHandler}
              placeholder="Enter Restaurant ID"
            />
          </Form.Group>
          <Form.Group controlId="formGridCName">
            <Form.Label>Restaurant Name</Form.Label>
            <Form.Control
              type="text"
              onChange={this.rnameEventHandler}
              placeholder="Enter Restaurant Name"
            />
          </Form.Group>

          <Form.Group controlId="formGridLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              onChange={this.locationEventHandler}
              placeholder="Enter Location"
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              onChange={this.emailEventHandler}
              placeholder="Enter Email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={this.passEventHandler}
              placeholder="Enter Password"
            />
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Terms and Conditions" />
          </Form.Group>

          <Button variant="danger" onClick={this.submitForm}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    getType: state.getType,
  };
};

export default connect(mapStateToProps)(signupform);
