import React, { Component } from "react";
import "./App.css";
import { Router } from "@reach/router";
import LoginPage from "./Components/Pages/LoginPage";
import HomePage from "./Components/Pages/HomePage";
import Loading from "./Components/Loading";
import TopicsPage from "./Components/Pages/TopicsPage";
import SingleArticlePage from "./Components/Pages/SingleArticlePage";
import UsersPage from "./Components/Pages/UsersPage";
import SingleTopicPage from "./Components/Pages/SingleTopicPage";

class App extends Component {
  state = {
    username: "",
    isLoading: false,
    loggedInUser: "weegembump"
  };

  render() {
    const { isLoading, loggedInUser } = this.state;
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
          <HomePage path="/" />
          <SingleArticlePage
            path="/articles/:article_id"
            loggedInUser={loggedInUser}
          />
          <TopicsPage path="/topics" />
          <SingleTopicPage path="/topics/:topic" />
          <UsersPage path="/users" />
        </Router>
      </div>
    );
  }
}

export default App;
