import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
// import { getFName } from "../../../../actions";
import { getusernamecust, RestaurantType } from "../../../../actions";
// import { getProfPic } from "../../../../actions";
import { loginMutation } from "../../../../mutation/mutation";
import { graphql, compose } from "react-apollo";
class signupform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      authFlag: false,
      error: "",
      jwt_token: "",
    };
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  usernameChangeHandler = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  submitLogin = async (e) => {
    //prevent page from refresh
    e.preventDefault();
    console.log(this.state);
    let mutationResponse = await this.props.loginMutation({
      variables: {
        email: this.state.username,
        pass: this.state.password,
      },
    });
    console.log(mutationResponse);
    let response = mutationResponse.data.login;
    if (response) {
      if (response.status === "200") {
        console.log(response.message);
        localStorage.setItem("_id", response.message);
        localStorage.setItem("typeofuser", "Customer");
        localStorage.setItem("LogFlag", true);
        this.setState({
          authFlag: true,
        });
      } else {
        this.setState({
          authFlag: false,
        });
      }
    }
  };
  // submitLogin = (e) => {
  //   //prevent page from refresh
  //   e.preventDefault();
  //   const data = {
  //     username: this.state.username,
  //     password: this.state.password,
  //   };
  //   //set the with credentials to true
  //   axios.defaults.withCredentials = true;
  //   //make a post request with the user data
  //   axios
  //     .post("http://localhost:3001/logincust", data)
  //     .then((response) => {
  //       console.log("Status Code : ", response.status);
  //       if (response.status === 200) {
  //         sessionStorage.setItem("typeofuser", "Customer");
  //         // getusernamecust = response.data[0].email;
  //         // this.props.dispatch(getFName(response.data[0].First_Name));
  //         // this.props.dispatch(getProfPic(response.data[0].prof_pic));
  //         this.setState({
  //           error: "",
  //           authFlag: true,
  //           jwt_token: response.data,
  //         });
  //         alert("Successful Login");
  //       } else {
  //         this.setState({
  //           error:
  //             "<p style={{color: red}}>Please enter correct credentials</p>",
  //           authFlag: false,
  //         });
  //       }
  //     })
  //     .catch((e) => {
  //       this.setState({
  //         error: "Please enter correct credentials" + e,
  //       });
  //     });
  // };

  render() {
    let redirectVar = null;
    if (this.state.authFlag) redirectVar = <Redirect to="/prof" />;
    else redirectVar = <Redirect to="/login" />;
    // console.log(cookie.load("cookie"));
    // if (cookie.load("cookie")) redirectVar = <Redirect to="/prof" />;
    // if (this.state.jwt_token.length > 0) {
    //   var decoded = jwt_decode(this.state.jwt_token.split(" ")[1]);
    //   localStorage.setItem("token", this.state.jwt_token);
    //   localStorage.setItem("user_id", decoded._id);
    //   localStorage.setItem("username", decoded.username);
    //   localStorage.setItem("type", decoded.type);
    //   redirectVar = <Redirect to="/prof" />;
    // } else redirectVar = <Redirect to="/login" />;
    // redirectVar = <Redirect to="/login" />;
    return (
      <div>
        {redirectVar}
        <div className=" container signin-form-cont">
          <Form className="signup-form">
            <h2>Customer Log In</h2>
            <p style={{ color: "red" }}>{this.state.error}</p>
            <p>
              For restaurants please click the link{" "}
              <Link to="/restaurantlogin">here</Link>
            </p>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                onChange={this.usernameChangeHandler}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={this.passwordChangeHandler}
              />
            </Form.Group>

            <Button variant="danger" onClick={this.submitLogin}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
export default compose(
  graphql(
    loginMutation,
    // { options: { fetchPolicy: "cache-and-network" } },
    { name: "loginMutation" }
  )
)(signupform);
