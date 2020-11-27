import React from "react";
import { Container, Row } from "react-bootstrap";
import Event from "./createEvent";

class Cont extends React.Component {
  render() {
    return (
      <Container>
        <Row></Row>
        <Row>
          <Event />
        </Row>
      </Container>
    );
  }
}

export default Cont;
