import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";
import Dish from "./dish";
import Primary from "./primary";
import Order from "./orderDish";

class Rest_Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideForm: "HideForm",
      hideProfileForm: "HideForm",
      hideObj: "HideForm",
      contact: "",
      email: "",
      website: "",
      name: "",
      dishOrder: [],
    };
  }

  getInfo = () => {
    const data = {
      email: this.props.match.params.email,
    };
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/rest_profile", data)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            error: "",
            contact: response.data.contact,
            name: response.data.name,
            email: response.data.email,
            website: response.data.website,
          });
          console.log("Response Post Call", response);
          sessionStorage.setItem(
            "dishOrder",
            JSON.stringify(this.state.dishOrder)
          );
          sessionStorage.setItem("restaurantNameForOrder", response.data.name);
          sessionStorage.setItem("restaurantEmailForOrder", data.email);
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
    this.getInfo();
  }

  render() {
    return (
      <Container style={{ width: 80 + "%" }}>
        <Row>
          <Col xl={4}>
            <Row
              className="all-row"
              style={{ textAlign: "center", marginTop: 10 + "px" }}
            >
              <Primary email={this.props.match.params.email} />
            </Row>
            <Row className="all-row"></Row>
            <Row className="all-row">
              <Container className="background top-10 padding-all skills">
                <h5>Contact Info</h5>
                <p>
                  Mobile No: <span>{this.state.contact}</span>
                </p>
                <p>
                  Email: <span>{this.state.email}</span>
                </p>
                <p>
                  Website: <span>{this.state.website}</span>
                </p>
              </Container>
            </Row>
            <Row>
              <Dish email={this.props.match.params.email} />
            </Row>
            <Row>
              <Order />
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Rest_Profile;
