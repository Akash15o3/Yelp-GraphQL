import React from "react";
import { Container } from "react-bootstrap";

import UserDes from "./user_des";

class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <UserDes />
      </Container>
    );
  }
}

export default UserList;
