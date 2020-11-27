import React from "react";
import { Container, Row } from "react-bootstrap";
import Primary from "./primary";

class Cont extends React.Component {
  render() {
    return (
      <Container>
        <Row></Row>
        <Row>
          <Primary />
        </Row>
      </Container>
    );
  }
}

export default Cont;
