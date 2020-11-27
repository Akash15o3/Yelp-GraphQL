import React from "react";
import { Container } from "react-bootstrap";

import EventDes from "./event_des";

class EventList extends React.Component {
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

export default EventList;
