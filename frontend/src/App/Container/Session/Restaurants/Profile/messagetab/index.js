import React from "react";
import { Container } from "react-bootstrap";

import MessageDes from "./des";

class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <MessageDes />
      </Container>
    );
  }
}

export default MessageList;
