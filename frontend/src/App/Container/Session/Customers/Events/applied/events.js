import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import axios from "axios";

class appliedEvent extends React.Component {
  render() {
    return (
      <Row
        key={this.props.id}
        className={"top-10 background job-listing " + this.props.showJob}
      >
        <Col xl={10}>
          <Container>
            <Link to={`/rest_prof/` + this.props.restaurantemail}>
              <h5 className="mbottom-5">{this.props.restaurantname}</h5>
            </Link>
            <h6 className="mbottom-5">Event ID: {this.props.id}</h6>
            <h6 className="mbottom-5">Event Name: {this.props.eventname}</h6>
            <h6 className="mbottom-5">Description: {this.props.description}</h6>
            <h6 className="mbottom-5">Location: {this.props.location}</h6>
            <h6 className="mbottom-5">Date of Event: {this.props.date}</h6>
            <h6 className="mbottom-5">
              Time of Attendance: {this.props.timeofevent}
            </h6>
            <h6 className="mbottom-5">Hashtags: {this.props.hashtag}</h6>

            <br></br>

            <br></br>
          </Container>
        </Col>
      </Row>
    );
  }
}

export default appliedEvent;
