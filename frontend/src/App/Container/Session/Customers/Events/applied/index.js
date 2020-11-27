import React from "react";
import { Container } from "react-bootstrap";

import EventDes from "./des";

class EventsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <EventDes />
      </Container>
    );
  }
}

export default EventsList;
