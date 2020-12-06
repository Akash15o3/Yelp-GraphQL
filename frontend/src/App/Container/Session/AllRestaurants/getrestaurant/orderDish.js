import React from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";
import Dish from "./dish";
import { addOrderMutation } from "../../../../../mutation/mutation";
import { graphql, compose } from "react-apollo";
class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setShow: false,
      Review: "",
    };
  }

  orderNow = async (deliveryType) => {
    // e.preventDefault();
    var orderTime = new Date();
    //set the with credentials to true
    let mutationResponse = await this.props.addOrderMutation({
      variables: {
        rest_name: this.state.rest_name,
        restaurantEmailForOrder: localStorage.getItem("eee"),
        customerEmailForOrder: localStorage.getItem("_id"),
        dishOrder: sessionStorage.getItem("dishOrder"),
        customerNameForOrder: sessionStorage.getItem("customerNameForOrder"),
        restaurantNameForOrder: sessionStorage.getItem(
          "restaurantNameForOrder"
        ),
        status: "Received",
        deliveryType: deliveryType,
        pickupStatus: "",
        deliveryStatus: "",
        timeOfOrder: JSON.stringify(orderTime),
      },
    });
    console.log(mutationResponse);
    let response = mutationResponse.data.addOrderMutation;
    if (response) {
      if (response.status === "200") {
        alert("Successfully Updated");
        this.handleClose();
      } else {
        console.log("unsuccessful");
      }
    }
  };
  // orderNow(deliveryType) {
  //   // e.preventDefault();
  //   axios.defaults.withCredentials = true;
  //   var orderTime = new Date();
  //   alert("Your food is ordered. Visit My Orders to review");
  //   const orderData = {
  //     restaurantEmailForOrder: sessionStorage.getItem(
  //       "restaurantEmailForOrder"
  //     ),
  //     customerEmailForOrder: sessionStorage.getItem("customerEmailForOrder"),
  //     dishOrder: JSON.parse(sessionStorage.getItem("dishOrder")),
  //     customerNameForOrder: sessionStorage.getItem("customerNameForOrder"),
  //     restaurantNameForOrder: sessionStorage.getItem("restaurantNameForOrder"),
  //     status: "Received",
  //     deliveryType: deliveryType,
  //     pickupStatus: "",
  //     deliveryStatus: "",
  //     timeOfOrder: orderTime,
  //   };
  //   axios.defaults.headers.common["authorization"] = localStorage.getItem(
  //     "token"
  //   );

  //   axios
  //     .post("http://localhost:3001/insertOrder", orderData)
  //     .then((response) => {
  //       console.log("Status Code : ", response.status);
  //       if (response.status === 200) {
  //         this.setState({
  //           error: "",
  //           authFlag: true,
  //         });
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

  // Review = (e) => {
  //   this.setState({
  //     Review: e.target.value,
  //   });
  //   console.log(e.target.value, "Review");
  // };

  // onSubmitReview(e) {
  //   // e.preventDefault();
  //   axios.defaults.withCredentials = true;
  //   const data = {
  //     restaurantEmailForOrder: sessionStorage.getItem(
  //       "restaurantEmailForOrder"
  //     ),
  //     customerEmailForOrder: sessionStorage.getItem("customerEmailForOrder"),
  //     customerNameForOrder: sessionStorage.getItem("customerNameForOrder"),
  //     Review: this.state.Review,
  //   };
  //   axios
  //     .post("http://localhost:3001/insertReview", data)
  //     .then((response) => {
  //       console.log("Status Code : ", response.status);
  //       if (response.status === 200) {
  //         this.setState({
  //           error: "",
  //           authFlag: true,
  //         });
  //         alert("review added");
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
  // componentDidMount() {
  //   // this.orderNow();
  // }

  render() {
    return (
      <div>
        <br></br>
        <Button
          type="button"
          variant="danger"
          onClick={() => this.orderNow("PickUp")}
        >
          Click Here for Pick-Up
        </Button>
        <br></br>
        <Button
          type="button"
          variant="danger"
          onClick={() => this.orderNow("Delivery")}
        >
          Click Here for Delivery
        </Button>
        <br></br>
        <form onSubmit={() => this.onSubmitReview(this.Review)}>
          <div style={{ width: "500px" }} class="form-group">
            <input
              type="text"
              class="form-control"
              name="Add Review"
              onChange={this.Review}
              placeholder="Give Feedback"
            />
          </div>
          <Button variant="danger" type="submit">
            Add Review
          </Button>
        </form>
      </div>
    );
  }
}
export default compose(graphql(addOrderMutation, { name: "addOrderMutation" }))(
  Order
);

// export default Order;
