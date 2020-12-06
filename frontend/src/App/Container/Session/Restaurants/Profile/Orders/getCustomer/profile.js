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
    return (
      <Container style={{ width: 80 + "%" }}>
        <Row>
          <Col xl={5}>
            <Row
              className="all-row"
              style={{ textAlign: "center", marginTop: 10 + "px" }}
            >
              <Container>
                <Row className={"padding-bottom-15 background"}>
                  <Col xl={11} style={{ width: 100 + "%" }}>
                    <Container>
                      <Row className="top-10 mleft-10">
                        <Container>
                          <h3>
                            {this.state.data.fname} {this.state.data.lname}
                          </h3>
                        </Container>
                      </Row>
                      <Row className="mleft-10">
                        <Container>
                          <Col xl={5}>
                            <Row>
                              <h3 className="small-grey">
                                nickname:{this.state.data.nickname}
                              </h3>
                            </Row>
                            <Row>
                              <h6 className="small-grey">
                                Location:{this.state.data.city},
                                {this.state.data.State},
                                {this.state.data.country}
                              </h6>
                            </Row>
                          </Col>
                          <Col xl={5}>
                            <Row>
                              <h6 className="small-grey">
                                Contact Number:{this.state.data.phonenumber}
                              </h6>
                            </Row>
                          </Col>

                          <Col xl={5}>
                            <Row>
                              <h6 className="small-grey">
                                EmailID:{this.state.data.email}
                              </h6>
                            </Row>
                            <Row>
                              <h6 className="small-grey">
                                thingd I Love:{this.state.data.thingsilove}
                              </h6>
                            </Row>
                            <Row>
                              <h6 className="small-grey">
                                Find Me In:{this.state.data.findmein}
                              </h6>
                            </Row>
                            <Row>
                              <h6 className="small-grey">
                                MyBlog:{this.state.data.myblog}
                              </h6>
                            </Row>
                            <Row>
                              <h6 className="small-grey">
                                YelpingSince:{this.state.data.yelpingsince}
                              </h6>
                            </Row>
                          </Col>
                        </Container>
                      </Row>
                    </Container>
                  </Col>
                </Row>
                <Row className="top-10">
                  <Col
                    xl={5}
                    style={{ paddingLeft: 0 + "px", width: 100 + "%" }}
                  >
                    <h3 className="small-grey">
                      About Me:{this.state.data.about}
                    </h3>
                  </Col>
                </Row>
              </Container>
            </Row>
            <Row className="all-row"></Row>
          </Col>
        </Row>
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
