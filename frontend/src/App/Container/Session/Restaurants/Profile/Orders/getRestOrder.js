import React from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { getRestaurantOrder } from "../../../../../../queries/queries";
import { getRestaurantOrderByStatus } from "../../../../../../queries/queries";
import { graphql, compose, withApollo } from "react-apollo";
import { updateOrderStatus } from "../../../../../../mutation/mutation";
class RestOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataList: [],
      dataListSearch: [],
      handleChange: "",
      updatedstatus: "",
      filterflag: 0,
      status: "",
      limit: 2,
      skip: 0,
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChangeFilter = this.handleChangeFilter.bind(this);

    // this.clearFlag = this.clearFlag.bind(this);
  }

  updatePers = async (e) => {
    // e.preventDefault();
    //set the with credentials to true
    let mutationResponse = await this.props.updateOrderStatus({
      variables: {
        status: e.target.value,

        _id: e.target.id,
      },
    });
    let response = mutationResponse.data.updateOrderStatus;
    if (response) {
      if (response.status === "200") {
        alert("Successfully Updated");
        this.handleClose();
      } else {
        console.log("unsuccessful");
      }
    }
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
      query: getRestaurantOrderByStatus,
      variables: {
        restaurantEmailForOrder: localStorage.getItem("_id"),
        status: this.state.status,
      },
      fetchPolicy: "no-cache",
    });
    this.setState({
      dataListSearch: data.restaurantOrderByStatus,
      filterflag: 1,
    });
    console.log("using apollo client", this.state.data);
  };

  async componentDidMount() {
    const { data } = await this.props.client.query({
      query: getRestaurantOrder,

      variables: { restaurantEmailForOrder: localStorage.getItem("_id") },
      fetchPolicy: "no-cache",
    });

    this.setState({ data: data.restaurantOrder });

    console.log("using apollo client", this.state.data);
  }

  handleChangeFilter = (e) => {
    this.setState({
      status: e.target.value,
    });
    console.log(e.target.value, "state", this.state.status);
  };

  // handleSubmit(e1) {
  //   console.log("Status", this.state.status);
  //   // console.log(this.fnameChange, this.fnameChange.firstname);
  //   axios.defaults.withCredentials = true;

  //   axios
  //     .get(
  //       "http://localhost:3001/orderbystatus?status=" +
  //         this.state.status +
  //         "&restaurantEmailForOrder=" +
  //         sessionStorage.getItem("restaurantEmailForOrder")
  //     )
  //     .then((response) => {
  //       if (response.status === 200) {
  //         this.setState({
  //           error: "",
  //           dataListSearch: response.data,
  //         });
  //         // this.getRestOrder();
  //         // console.log("Dish Data", response.data);
  //         console.log("Test", this.state.dataListSearch);
  //       } else {
  //         this.setState({
  //           error: "<p style={{color: red}}>Please enter correct Email</p>",
  //           authFlag: false,
  //         });
  //       }
  //     })
  //     .catch((e) => {
  //       this.setState({
  //         error: "Please enter correct Email" + e,
  //       });
  //     });
  //   // this.setState({ filterflag: 1 });
  //   this.state.filterflag = 1;
  //   e1.preventDefault();
  // }

  // clearFlag(e) {
  //   this.setState({ filterflag: 0 });

  //   e.preventDefault();
  // }

  getTimeOfOrder = (e) => {
    //e.preventDefault();
    console.log("Value of Time", e);
  };

  // componentDidMount() {
  //   this.getRestOrder();
  //   this.setState({
  //     handleChange: this.props.handleChange,
  //     updatedStatus: this.props.updatedstatus,
  //   });
  // }

  render() {
    const filterflag = this.state.filterflag;

    if (filterflag === 0) {
      var display = this.state.data.map(
        ({
          _id,
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
                        <Link
                          id={timeOfOrder}
                          to={`/cust_prof/` + customerEmailForOrder}
                          onClick={this.getTimeOfOrder(timeOfOrder)}
                          onR
                        >
                          <h3>Customer Name : {customerNameForOrder}</h3>
                        </Link>
                      </Container>
                    </Row>
                    <Row className="mleft-10">
                      <Container>
                        <Col xl={7}>
                          <Row>
                            <h6 className="small-grey">
                              EmailID of Customer: {customerEmailForOrder}
                            </h6>
                          </Row>
                          <Row>
                            <h6 className="small-grey">
                              Status of Order :
                              <select
                                id={_id}
                                defaultValue={status}
                                onChange={this.updatePers}
                              >
                                <option value="Received">Received</option>
                                <option value="Preparing">Preparing</option>
                                <option value="On The Way">On The Way</option>
                                <option value="Delivered">Delivered</option>
                              </select>
                            </h6>
                          </Row>
                          <Row></Row>
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
          _id,
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
                        <Link
                          id={timeOfOrder}
                          to={`/cust_prof_message/` + customerEmailForOrder}
                          onClick={this.getTimeOfOrder(timeOfOrder)}
                          onR
                        >
                          <h3>Customer Name : {customerNameForOrder}</h3>
                        </Link>
                      </Container>
                    </Row>
                    <Row className="mleft-10">
                      <Container>
                        <Col xl={7}>
                          <Row>
                            <h6 className="small-grey">
                              EmailID of Customer: {customerEmailForOrder}
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
        <h1>Received Orders</h1>
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
        <Button variant="danger" onClick={this.clearFlag}>
          Clear Search
        </Button>
        <br></br>
        <div>{display}</div>
      </div>
    );
  }
}

export default compose(
  // graphql(getRestaurantOrder, {
  //   options: {
  //     // fetchPolicy: "cache-and-network",
  //     variables: { restaurantEmailForOrder: localStorage.getItem("_id") },
  //   },
  // }),
  withApollo,
  graphql(updateOrderStatus, { name: "updateOrderStatus" })
)(RestOrder);
