import React from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
// import Orderedrest from "./orderedRest";
// import Ordered from "./ordered";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";
import Rest from "./allrest";
import { getAllRestaurantQuery } from "../../../../queries/queries";
import { getRestByLocation } from "../../../../queries/queries";
import { graphql, compose, withApollo } from "react-apollo";
import axios from "axios";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
class RestDes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataListSearch: [],
      error: "",
      limit: 1,
      skip: 0,
      location: "",
      filterflag: 0,
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.clearFlag = this.clearFlag.bind(this);
    // this.nextPage = this.nextPage.bind(this);
    // this.previousPage = this.previousPage.bind(this);
  }
  static defaultProps = {
    center: {
      lat: 37.3382,
      lng: -121.8863,
    },
    zoom: 11,
  };
  // componentDidMount() {
  //   console.log(this.props.data);
  //   if (this.props.data.allRestaurant) {
  //     let props = this.props.data.allRestaurant;
  //     this.setState({
  //       data: props,
  //     });
  //   }
  // }

  async componentDidMount() {
    const { data } = await this.props.client.query({
      query: getRestByLocation,

      variables: { location: "" },
      fetchPolicy: "no-cache",
    });

    this.setState({ data: data.allRestaurantByLocation });

    console.log("using apollo client", this.state.data);
  }

  // componentDidUpdate(prevProps) {
  //   // console.log("All" + this.props.data.allRestaurant[0]._id);

  //   if (this.props.data !== prevProps.data) {
  //     let props = this.props.data.allRestaurantByLocation;
  //     this.setState({
  //       data: props,
  //     });
  //   }
  // }
  // handleChange = (e) => {
  //   this.setState({
  //     location: e.target.value,
  //   });
  //   console.log(e.target.value, "city", this.state.location);
  // };

  handleSubmit(e1) {
    console.log("city", this.state.location);

    // console.log(this.fnameChange, this.fnameChange.firstname);
    // axios.defaults.withCredentials = true;
    // axios.defaults.headers.common["authorization"] = localStorage.getItem(
    //   "token"
    // );

    // axios
    //   .get(
    //     "http://localhost:3001/allrestaurant/allrestsearch?location=" +
    //       this.state.location
    //   )
    //   .then((response) => {
    //     if (response.status === 200) {
    //       this.setState({
    //         error: "",
    //         dataListSearch: response.data,
    //       });
    //       // this.getInfo();
    //       // console.log("Dish Data", response.data);
    //       console.log("Test", this.state.dataListSearch);
    //     } else {
    //       this.setState({
    //         error: "<p style={{color: red}}>Please enter correct Email</p>",
    //         authFlag: false,
    //       });
    //     }
    //   })
    //   .catch((e) => {
    //     this.setState({
    //       error: "Please enter correct Email" + e,
    //     });
    //   });

    let props = this.props.data.allRestaurantByLocation;
    this.setState({
      data: props,
    });
    this.setState({ filterflag: 1 });
    // e1.preventDefault();
  }

  // clearFlag(e) {
  //   this.setState({ filterflag: 0 });
  //   this.getInfo();
  //   e.preventDefault();
  // }

  // nextPage() {
  //   console.log("In The Next Function", this.state.skip, this.state.limit);

  //   this.state.skip = this.state.skip + this.state.limit;
  //   console.log("After Next Function", this.state.skip, this.state.limit);
  //   this.getInfo();
  // }
  // previousPage() {
  //   console.log("In The Previous Function", this.state.skip, this.state.limit);
  //   if (this.state.skip > 0) {
  //     this.state.skip = this.state.skip - this.state.limit;

  //     this.getInfo();
  //   }
  // }

  // componentDidMount() {
  //   this.getInfo();
  // }

  render() {
    const filterflag = this.state.filterflag;
    if (filterflag === 0) {
      var printRest = this.state.data.map(
        ({
          restaurantID,
          name,
          email,
          pass,
          location,
          description,
          contact,
          timing,
          reviews,
          website,
        }) => {
          return (
            <Rest
              id={restaurantID}
              key={restaurantID}
              email={email}
              location={location}
              name={name}
              description={description}
              contact={contact}
            />
          );
        }
      );
    } else if (filterflag === 1) {
      var printRest = this.state.data.map(
        ({
          restaurantID,
          name,
          email,
          pass,
          location,
          description,
          contact,
          timing,
          reviews,
          website,
        }) => {
          return (
            <Rest
              id={restaurantID}
              key={restaurantID}
              email={email}
              location={location}
              name={name}
              description={description}
              contact={contact}
            />
          );
        }
      );
    }

    return (
      <Container width={"100px"} height={"100px"}>
        <form onSubmit={this.handleSubmit}>
          <div style={{ width: "500px" }} class="form-group">
            <input
              type="text"
              class="form-control"
              name="Search by Location"
              value={this.state.location}
              onChange={this.handleChange}
              placeholder="Search by Location"
            />
          </div>
          <Button variant="danger" type="submit">
            Search by Location
          </Button>
        </form>
        <Button variant="danger" onClick={this.clearFlag}>
          Clear Search
        </Button>
        <br></br>

        {printRest}

        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyAZUmNRp1WGPYcfM - XdWPM8NR7C37KKYLM",
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <AnyReactComponent lat={37.3352} lng={-121.8811} text="My Marker" />
          </GoogleMapReact>
        </div>
      </Container>
    );
  }
}

export default withApollo(RestDes);
