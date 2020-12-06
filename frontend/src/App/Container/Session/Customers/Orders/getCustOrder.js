import React from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";
import { getCustomerOrder } from "../../../../../queries/queries";
import { getCustomerOrderByStatus } from "../../../../../queries/queries";
import { getCustomerOrderDesc } from "../../../../../queries/queries";

import { graphql, compose, withApollo } from "react-apollo";
class CustOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   email: "",
      dataList: [],
      dataListSearch: [],
      limit: 2,
      skip: 0,
      filterflag: 0,
      status: "",
      data: [],
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.doDesc = this.doDesc.bind(this);
    // this.handleChangeFilter = this.handleChangeFilter.bind(this);
    // this.clearFlag = this.clearFlag.bind(this);
    // this.nextPage = this.nextPage.bind(this);
    // this.previousPage = this.previousPage.bind(this);
  }
  async componentDidMount() {
    const { data } = await this.props.client.query({
      query: getCustomerOrder,

      variables: { customerEmailForOrder: localStorage.getItem("_id") },
      fetchPolicy: "no-cache",
    });

    this.setState({ data: data.customerOrder });

    console.log("using apollo client", this.state.data);
  }
  handleChangeFilter = (e) => {
    this.setState({
      status: e.target.value,
    });
    console.log(e.target.value, "state", this.state.status);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit");
    console.log(
      "Values for handle submit",
      localStorage.getItem("_id"),
      this.state.status
    );
    const { data } = await this.props.client.query({
      query: getCustomerOrderByStatus,
      variables: {
        customerEmailForOrder: localStorage.getItem("_id"),
        status: this.state.status,
      },
      fetchPolicy: "no-cache",
    });
    this.setState({
      dataListSearch: data.customerOrderByStatus,
      filterflag: 1,
    });
    console.log("using apollo client", this.state.data);
  };

  doDesc = async (e) => {
    e.preventDefault();
    console.log("handle submit");

    const { data } = await this.props.client.query({
      query: getCustomerOrderDesc,
      variables: {
        customerEmailForOrder: localStorage.getItem("_id"),
      },
      fetchPolicy: "no-cache",
    });
    this.setState({
      dataList: data.getCustomerOrderDesc,
      filterflag: 2,
    });
    console.log("using apollo client", this.state.data);
  };

  // doDesc(e) {
  //   axios.defaults.withCredentials = true;

  //   const orderData = {
  //     customerEmailForOrder: localStorage.getItem("username"),
  //   };

  //   axios
  //     .get(
  //       "http://localhost:3001/getCustOrderDesc?customerEmailForOrder=" +
  //         orderData.customerEmailForOrder +
  //         "&limit=" +
  //         this.state.limit +
  //         "&skip=" +
  //         this.state.skip
  //     )
  //     .then((response) => {
  //       console.log("Status Code : ", response.status);
  //       if (response.status === 200) {
  //         this.setState({
  //           error: "",
  //           dataList: response.data,
  //         });
  //         // console.log("Order Data of customers", dataList);
  //       } else {
  //         this.setState({
  //           error:
  //             "<p style={{color: red}}>Please enter correct credentials</p>",
  //           authFlag: false,
  //         });
  //       }
  //     })
  //     .catch((e) => {
  //       this.setState({
  //         error: "Error while ordering" + e,
  //       });
  //     });
  // }

  render() {
    const filterflag = this.state.filterflag;
    if (filterflag === 0) {
      var display = this.state.data.map(
        ({
          customerEmailForOrder,
          restaurantEmailForOrder,
          customerNameForOrder,
          restaurantNameForOrder,
          dishOrder,
          status,
          deliveryType,
          pickupStatus,
          deliveryStatus,
          timeOfOrder,
        }) => {
          return (
            <Container>
              <Row className={"padding-bottom-15 background"}>
                <Col xl={11} style={{ width: 100 + "%" }}>
                  <Container>
                    <Row className="top-10 mleft-10">
                      <Container>
                        <h3>Restaurant Name : {restaurantNameForOrder}</h3>
                      </Container>
                    </Row>
                    <Row className="mleft-10">
                      <Container>
                        <Col xl={7}>
                          <Row>
                            <h6 className="small-grey">
                              EmailID of Restaurant: {restaurantEmailForOrder}
                            </h6>
                          </Row>
                          <Row>
                            <h6 className="small-grey">
                              Status of Order : {status}
                            </h6>
                          </Row>
                          <Row>
                            <h6 className="small-grey">
                              Delivery Type : {deliveryType}
                            </h6>
                          </Row>
                          <Row>
                            <h6 className="small-grey">
                              Dishes Ordered : {dishOrder}
                            </h6>
                          </Row>
                          <Row>
                            <h6 className="small-grey">
                              Time of Order : {timeOfOrder}
                            </h6>
                          </Row>
                        </Col>
                      </Container>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Container>
          );
        }
      );
    } else if (filterflag === 1) {
      var display = this.state.dataListSearch.map(
        ({
          customerEmailForOrder,
          restaurantEmailForOrder,
          customerNameForOrder,
          restaurantNameForOrder,
          dishOrder,
          status,
          deliveryType,
          pickupStatus,
          deliveryStatus,
          timeOfOrder,
        }) => {
          return (
            <Container>
              <Row className={"padding-bottom-15 background"}>
                <Col xl={11} style={{ width: 100 + "%" }}>
                  <Container>
                    <Row className="top-10 mleft-10">
                      <Container>
                        <h3>Restaurant Name : {restaurantNameForOrder}</h3>
                      </Container>
                    </Row>
                    <Row className="mleft-10">
                      <Container>
                        <Col xl={7}>
                          <Row>
                            <h6 className="small-grey">
                              EmailID of Restaurant: {restaurantEmailForOrder}
                            </h6>
                          </Row>
                          <Row>
                            <h6 className="small-grey">
                              Status of Order : {status}
                            </h6>
                          </Row>
                          <Row>
                            <h6 className="small-grey">
                              Delivery Type : {deliveryType}
                            </h6>
                          </Row>
                          <Row>
                            <h6 className="small-grey">
                              Dishes Ordered : {dishOrder}
                            </h6>
                          </Row>
                          <Row>
                            <h6 className="small-grey">
                              Time of Order : {timeOfOrder}
                            </h6>
                          </Row>
                        </Col>
                      </Container>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Container>
          );
        }
      );
    } else if (filterflag === 2) {
      var display = this.state.dataList.map(
        ({
          customerEmailForOrder,
          restaurantEmailForOrder,
          customerNameForOrder,
          restaurantNameForOrder,
          dishOrder,
          status,
          deliveryType,
          pickupStatus,
          deliveryStatus,
          timeOfOrder,
        }) => {
          return (
            <Container>
              <Row className={"padding-bottom-15 background"}>
                <Col xl={11} style={{ width: 100 + "%" }}>
                  <Container>
                    <Row className="top-10 mleft-10">
                      <Container>
                        <h3>Restaurant Name : {restaurantNameForOrder}</h3>
                      </Container>
                    </Row>
                    <Row className="mleft-10">
                      <Container>
                        <Col xl={7}>
                          <Row>
                            <h6 className="small-grey">
                              EmailID of Restaurant: {restaurantEmailForOrder}
                            </h6>
                          </Row>
                          <Row>
                            <h6 className="small-grey">
                              Status of Order : {status}
                            </h6>
                          </Row>
                          <Row>
                            <h6 className="small-grey">
                              Delivery Type : {deliveryType}
                            </h6>
                          </Row>
                          <Row>
                            <h6 className="small-grey">
                              Dishes Ordered : {dishOrder}
                            </h6>
                          </Row>
                          <Row>
                            <h6 className="small-grey">
                              Time of Order : {timeOfOrder}
                            </h6>
                          </Row>
                        </Col>
                      </Container>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Container>
          );
        }
      );
    }

    return (
      <div>
        <h1>My Orders</h1>
        <form onSubmit={this.handleSubmit}>
          <div style={{ width: "500px" }} class="form-group">
            <input
              type="text"
              class="form-control"
              name="Search by Order Status"
              value={this.state.status}
              onChange={this.handleChangeFilter}
              placeholder="Search by Order Status"
            />
          </div>
          <Button variant="danger" type="submit">
            Search by Order Status
          </Button>
        </form>
        <br></br>
        <Button variant="danger" onClick={this.clearFlag}>
          Clear Search
        </Button>
        <br></br>
        <h4>Sort By Time Of Order</h4>

        <br></br>
        <Button variant="danger" onClick={this.doDesc}>
          Descending
        </Button>
        <br></br>

        <div>{display}</div>
      </div>
    );
  }
}

export default withApollo(CustOrder);
