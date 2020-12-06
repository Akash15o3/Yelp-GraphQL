import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";
import { getCustomerQuery } from "../../../../../../../queries/queries";
import { graphql, compose } from "react-apollo";
class Cust_Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideForm: "HideForm",
      hideProfileForm: "HideForm",
      hideObj: "HideForm",
      contact: "",
      email: "",
      website: "",
      name: "",
      dishOrder: [],
      data: [],
    };
  }
  componentDidMount() {
    // console.log("Email id to get rest profile ", localStorage.getItem("eee"));
    if (this.props.data.customer) {
      let props = this.props.data.customer;
      this.setState({
        data: props,
      });
    }
  }

  componentDidUpdate(prevProps) {
    console.log("Data Update in profile ", this.props.data);
    if (this.props.data !== prevProps.data) {
      let props = this.props.data.customer;
      this.setState({
        data: props,
      });
    }
  }

  render() {
    console.log(this.state.data);
    var pic = "/profile.png";
    return (
      <Container>
        <Row className={"padding-bottom-15 background"}>
          <Col xl={11} style={{ width: 100 + "%" }}>
            <Col xl={1}>
              <img
                src={pic}
                alt="user pic"
                style={{ width: 100 + "px", marginTop: 20 + "px" }}
              />
            </Col>
            <Container>
              <Row className="top-10 mleft-10">
                <Container>
                  <h3>
                    {this.state.data.fname} {this.state.data.lname}
                  </h3>
                  <h6 className="small-grey">
                    Emailid:{this.state.data.email}
                  </h6>
                  <h5 className="small-grey">
                    Nickname:{this.state.data.nickname}
                  </h5>
                </Container>
              </Row>
              <Row className="mleft-10">
                <Container>
                  <Col xl={7}>
                    <Row>
                      <h6 className="small-grey">
                        Date Of Birth:{this.state.data.dateofbirth}
                      </h6>
                    </Row>
                    <Row>
                      <h6 className="small-grey">
                        Contact Info:{this.state.data.phonenumber}
                      </h6>
                    </Row>
                  </Col>
                  <Col xl={7}>
                    <Row>
                      <h6 className="small-grey">
                        City:{this.state.data.city}
                      </h6>
                      <h6 className="small-grey">, {this.state.data.State}</h6>
                      <h6 className="small-grey">
                        , {this.state.data.country}
                      </h6>
                    </Row>
                    <Row>
                      <h6 className="small-grey">
                        Contact Info:{this.state.data.phonenumber}
                      </h6>
                    </Row>
                  </Col>
                  <Col xl={5}>
                    <Row>
                      <h6 className="small-grey">
                        Yelping Since:{this.state.data.yelpingsince}
                      </h6>
                    </Row>
                  </Col>

                  <Col xl={5}>
                    <Row>
                      <h6 className="small-grey">
                        Things I Love:{this.state.data.thingsilove}
                      </h6>
                    </Row>
                  </Col>
                  <Col xl={5}>
                    <Row>
                      <h6 className="small-grey">
                        Find Me In:{this.state.data.findmein}
                      </h6>
                    </Row>
                  </Col>
                  <Col xl={5}>
                    <Row>
                      <h6 className="small-grey">
                        My Blog:{this.state.data.myblog}
                      </h6>
                    </Row>
                  </Col>
                  <Col xl={5}>
                    <Row>
                      <h4 className="small-grey">
                        About Me:{this.state.data.about}
                      </h4>
                    </Row>
                  </Col>
                </Container>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row className="top-10"></Row>
      </Container>
    );
  }
}
export default compose(
  graphql(getCustomerQuery, {
    options: (props) => ({
      variables: { email: props.match.params.customerEmailForOrder },
    }),
  })
)(Cust_Profile);
