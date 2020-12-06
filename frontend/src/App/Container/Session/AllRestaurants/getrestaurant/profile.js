import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";
import Dish from "./dish";
// import Primary from "./primary";
import Order from "./orderDish";
import { getRestaurantQuery } from "../../../../../queries/queries";
import { getDishQuery } from "../../../../../queries/queries";
import { graphql, compose } from "react-apollo";

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
      data: [],
      dataList: [],
      eee: this.props.match.params.email,
    };
  }
  componentWillMount() {
    localStorage.setItem("eee", this.props.match.params.email);

    console.log(
      "Email id to get rest profile for comp will mount ",
      localStorage.getItem("eee")
    );
    sessionStorage.setItem("restaurantNameForOrder", this.state.data.name);
  }
  componentDidMount() {
    console.log("Email id to get rest profile ", localStorage.getItem("eee"));
    sessionStorage.setItem("dishOrder", JSON.stringify(this.state.dishOrder));
    if (this.props.data.restaurant) {
      let props = this.props.data.restaurant;
      this.setState({
        data: props,
      });
    }
    sessionStorage.setItem("restaurantNameForOrder", this.state.data.name);
    // if (this.props.data.getDishQuery) {
    //   let props = this.props.data.getDishQuery;
    //   this.setState({
    //     dataList: props,
    //   });
    // }
  }

  componentDidUpdate(prevProps) {
    console.log("Data Update in profile ", this.props.data);
    if (this.props.data !== prevProps.data) {
      console.log("in if of component did update of profile");
      let props = this.props.data.restaurant;
      this.setState({
        data: props,
      });
    }
    sessionStorage.setItem("restaurantNameForOrder", this.state.data.name);
  }

  render() {
    var pic = "/profile.png";
    return (
      <Container style={{ width: 80 + "%" }}>
        <Row>
          <Col xl={4}>
            <img
              src={pic}
              alt="user pic"
              style={{ width: 100 + "px", marginTop: 20 + "px" }}
            />
          </Col>
          <Col xl={4}>
            <Row
              className="all-row"
              style={{ textAlign: "center", marginTop: 10 + "px" }}
            >
              <h2>Restaurant Name : {this.state.data.name}</h2>
            </Row>
            <Row
              className="all-row"
              style={{ textAlign: "center", marginTop: 10 + "px" }}
            >
              Restaurant emailid : {this.state.data.email}
            </Row>
            <Row className="all-row"></Row>
            <Row className="all-row">
              <Container className="background top-10 padding-all skills">
                <h5>Contact Info</h5>
                <p>
                  Mobile No: <span>{this.state.data.contact}</span>
                </p>
                <p>
                  Email: <span>{this.state.data.email}</span>
                </p>
                <p>
                  Website: <span>{this.state.data.website}</span>
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

export default compose(
  graphql(getRestaurantQuery, {
    options: (props) => ({
      variables: { email: props.match.params.email },
    }),
  })
)(Rest_Profile);
// export default Rest_Profile;
