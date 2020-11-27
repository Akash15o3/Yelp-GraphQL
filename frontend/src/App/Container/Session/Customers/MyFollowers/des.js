import React from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Follower from "./follower";

import axios from "axios";

class FollowerDes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: "",
      customername: "",
    };
    // this.submitrest = this.submitrest.bind(this);
  }

  getInfo = () => {
    axios.defaults.headers.common["authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .get(
        "http://localhost:3001/getFollowers?customername=" +
          localStorage.getItem("username")
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            error: "",
            data: response.data,
          });
          console.log("Follower Data", response.data);
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
    var printFollower = this.state.data.map(
      ({
        customername,
        followcustomerfname,
        followcustomerlname,
        followcustomercity,
        followcustomerstate,
        followcustomercountry,
        followcustomerabout,
      }) => {
        return (
          <Follower
            id={customername}
            key={customername}
            followcustomerfname={followcustomerfname}
            followcustomerlname={followcustomerlname}
            followcustomercity={followcustomercity}
            followcustomerstate={followcustomerstate}
            followcustomercountry={followcustomercountry}
            followcustomerabout={followcustomerabout}
          />
        );
      }
    );

    return <Container>{printFollower}</Container>;
  }
}

export default FollowerDes;
