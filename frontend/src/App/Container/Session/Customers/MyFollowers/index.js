import React from "react";
import { Container } from "react-bootstrap";

import FollowDes from "./des";

class FollowList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <FollowDes />
      </Container>
    );
  }
}

export default FollowList;
