import React, { Component } from "react";
import "./App.css";
import { Router } from "@reach/router";
import Header from "./Components/Header";
import Loading from "./Components/Loading";
import DisplayError from "./Components/DisplayError";
import LoginPage from "./Components/Pages/LoginPage";
import ArticleList from "./Components/Lists/ArticleList";
import SingleArticlePage from "./Components/Pages/SingleArticlePage";
import TopicsPage from "./Components/Pages/TopicsPage";
import SingleTopicPage from "./Components/Pages/SingleTopicPage";
import UsersPage from "./Components/Pages/UsersPage";
import SingleUserPage from "./Components/Pages/SingleUserPage";
import AddArticle from "./Components/Forms/AddArticle";

class App extends Component {
  state = {
    username: "",
    isLoading: false,
    loggedInUser: "weegembump",
    err: "404 Page Not Found"
  };

  render() {
    const { isLoading, loggedInUser, err } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <div className="App">
        <Header loggedInUser={loggedInUser} />
        <Router>
          <LoginPage
            path="/login"
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
          <ArticleList path="/" />
          <SingleArticlePage
            path="/articles/:article_id"
            loggedInUser={loggedInUser}
          />
          <AddArticle path="/post_article" loggedInUser={loggedInUser} />
          <TopicsPage path="/topics" />
          <SingleTopicPage path="/topics/:topic" loggedInUser={loggedInUser} />
          <UsersPage path="/users" />
          <SingleUserPage path="/users/:author" />
          <DisplayError path="/*" err={err} default />
        </Router>
      </div>
    );
  }
}

export default App;
