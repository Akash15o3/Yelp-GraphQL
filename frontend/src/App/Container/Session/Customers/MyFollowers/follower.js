import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import axios from "axios";

class Follower extends React.Component {
  render() {
    return (
      <Row
        key={this.props.id}
        className={"top-10 background job-listing " + this.props.showJob}
      >
        <Col xl={10}>
          <Container>
            <Link to={`/cust_prof/` + this.props.email}>
              <h5 className="mbottom-5">
                {this.props.followcustomerfname}{" "}
                {this.props.followcustomerlname}
              </h5>
            </Link>
            <h6 className="mbottom-5">City: {this.props.followcustomercity}</h6>
            <h6 className="mbottom-5">
              State: {this.props.followcustomerstate}
            </h6>
            <h6 className="mbottom-5">Country: {this.props.country}</h6>
            <h6 className="mbottom-5">
              About: {this.props.followcustomerabout}
            </h6>

            <br></br>

            <br></br>
          </Container>
        </Col>
      </Row>
    );
  }
}

export default Follower;
