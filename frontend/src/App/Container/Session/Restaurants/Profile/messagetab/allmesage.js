import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataListSearch: [],
      dataListFilter: [],
      error: "",
      reply: "",
      fname: "",
      city: "",
      filterflag: 0,
      limit: 1,
      skip: 0,
      authFlag: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      reply: e.target.value,
    });
    console.log(e.target.value, "Reply", this.state.reply);
  };

  handleSubmit(e1) {
    console.log("Reply", this.state.reply);
    // console.log(this.fnameChange, this.fnameChange.firstname);
    // axios.defaults.withCredentials = true;
    let data = {
      restaurantemailformessage: this.props.restaurantemail,
      restaurantnameformessage: this.props.restaurantname,
      customeremailformessage: this.props.customeremail,
      customernameformessage: this.props.customername,
      message: this.state.reply,
      sender: sessionStorage.getItem("typeofuser"),
    };
    axios
      .post("http://localhost:3001/insertMessage", data)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            error: "",
            authFlag: true,
          });

          // console.log("Dish Data", response.data);
          // console.log("Test", this.state.dataListSearch);
        } else {
          this.setState({
            error: "<p style={{color: red}}>Please enter correct Email</p>",
            authFlag: false,
          });
        }
      })
      .catch((e) => {
        this.setState({
          error: "Please enter correct Message" + e,
        });
      });
    e1.preventDefault();
  }
  render() {
    var messages = this.props.message.map(
      ({ messageContent, timestamp, messageSender }) => {
        return (
          <div>
            <h6>
              {messageSender} replied : {messageContent}
            </h6>
            <h6>At : {timestamp}</h6>
          </div>
        );
      }
    );
    return (
      <Row key={this.props.id} className={"top-10 background job-listing "}>
        <Col xl={10}>
          <Container>
            <h4 className="mbottom-5">
              Customer Name: {this.props.customername}
            </h4>

            <h4 className="mbottom-5">My Messages : </h4>
            {messages}
            <br></br>
            <form onSubmit={this.handleSubmit}>
              <div style={{ width: "500px" }} class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="Reply"
                  value={this.state.reply}
                  onChange={this.handleChange}
                  placeholder="Reply"
                />
              </div>
              <Button variant="danger" type="submit">
                Reply
              </Button>
            </form>
          </Container>
        </Col>
      </Row>
    );
  }
}

export default User;
