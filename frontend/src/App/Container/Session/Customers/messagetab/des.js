import React from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import User from "./allmessage";
import axios from "axios";

class MessageDes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  getInfo = () => {
    axios
      .get(
        "http://localhost:3001/getAllMessages?customeremail=" +
          sessionStorage.getItem("customerEmailForOrder")
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            error: "",
            data: response.data,
          });
          console.log("data", this.state.data);
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

  componentDidMount() {
    // this.setState({
    //   fname: this.props.data[0].fname,
    // });
    this.getInfo();
  }

  render() {
    var printMessage = this.state.data.map(
      ({
        restaurantname,
        restaurantemail,
        customername,
        customeremail,
        message,
      }) => {
        return (
          <User
            id={restaurantemail}
            key={restaurantemail}
            restaurantname={restaurantname}
            restaurantemail={restaurantemail}
            customername={customername}
            customeremail={customeremail}
            message={message}
          />
        );
      }
    );
    return (
      <Container>
        <h2>My Messages</h2>
        <br></br>
        {printMessage}{" "}
      </Container>
    );
  }
}

export default MessageDes;
