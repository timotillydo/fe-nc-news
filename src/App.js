import React, { Component } from "react";
import "./App.css";
import { Router } from "@reach/router";
import LoginPage from "./Components/Pages/LoginPage";
import HomePage from "./Components/Pages/HomePage";
import Loading from "./Components/Loading";

class App extends Component {
  state = {
    username: "",
    isLoading: false,
    isLoggedIn: true
  };

  render() {
    const { isLoading } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <div className="App">
        <Router>
          <LoginPage
            path="/login"
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
          <HomePage path="/home" />
        </Router>
      </div>
    );
  }
}

export default App;
