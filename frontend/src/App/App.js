import React, { Component } from "react";
// import "./App.css";
import Bodycont from "./Container/bodyCont";
import { BrowserRouter } from "react-router-dom";

//App Component
class App extends Component {
  state = { loginType: "" };
  render() {
    return (
      //Use Browser Router to route to different pages
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called BodyContainer*/}
          <Bodycont loginType={this.state.loginType} />
        </div>
      </BrowserRouter>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;
