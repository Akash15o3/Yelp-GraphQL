import React from "react";
import { Container } from "react-bootstrap";
import { getRestByLocation } from "../../../../queries/queries";
import RestDes from "./rest_des";

class RestList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <RestDes />
      </Container>
    );
  }
}

export default RestList;
