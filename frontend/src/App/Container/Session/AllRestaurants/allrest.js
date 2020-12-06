import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

class Rest extends React.Component {
  render() {
    return (
      <Row key={this.props.id} className={"top-10 background job-listing "}>
        <Col xl={10}>
          <Container>
            <Link to={`/rest_prof/` + this.props.email}>
              <h5 className="mbottom-5">{this.props.name}</h5>
            </Link>
            <h6 className="mbottom-5">{this.props.location}</h6>
            <h6 className="mbottom-5">{this.props.description}</h6>
            <h6 className="mbottom-5">{this.props.contact}</h6>
          </Container>
        </Col>
      </Row>
    );
  }
}

export default Rest;
