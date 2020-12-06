import React from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";
import Dish from "./dish";
import { addOrderMutation } from "../../../../../mutation/mutation";
import { addReview } from "../../../../../mutation/mutation";
import { graphql, compose } from "react-apollo";
class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setShow: false,
      Review: "",
    };
    this.Review = this.Review.bind(this);
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
        this.handleClose();
      } else {
        console.log("unsuccessful");
      }
    }
    alert("Food Ordered");
  };
  onSubmitReview = async (e) => {
    e.preventDefault();
    console.log(this.state.Review);
    //set the with credentials to true
    let mutationResponse = await this.props.addReview({
      variables: {
        email: localStorage.getItem("eee"),

        reviews: this.state.Review,
      },
    });
    let response = mutationResponse.data.addReview;
    if (response) {
      if (response.status === "200") {
        alert("Review Added");
      } else {
        console.log("unsuccessful");
      }
    }
    alert("Review Added");
  };

  Review = (e) => {
    this.setState({
      Review: e.target.value,
    });
    console.log(e.target.value, "Review");
  };

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
        <form onSubmit={this.onSubmitReview}>
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
export default compose(
  graphql(addOrderMutation, { name: "addOrderMutation" }),
  graphql(addReview, { name: "addReview" })
)(Order);

// export default Order;
