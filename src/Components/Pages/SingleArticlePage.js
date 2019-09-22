import React, { Component } from "react";
import * as api from "../../api";
import ArticleCard from "../Cards/ArticleCard";
import CommentList from "../Lists/CommentList";
import Loading from "../Loading";
import DisplayError from "./Components/DisplayError";

class SingleArticlePage extends Component {
  state = { article: {}, isLoading: true, err: null };

  componentDidMount = () => {
    this.fetchArticle();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.article.votes !== this.state.article.votes)
      this.fetchArticle();
  };

  fetchArticle = () => {
    const { article_id } = this.props;
    api
      .getArticle(article_id)
      .then(article => {
        this.setState(currentState => {
          return { article, isLoading: false };
        });
      })
      .catch(err => {
        const { errMsg } = err.response.data;
        this.setState({ err: errMsg, isLoading: false });
      });
  };

  render() {
    const { article, isLoading, err } = this.state;
    const { article_id, loggedInUser } = this.props;
    return isLoading ? (
      <Loading />
    ) : err ? (
      <DisplayError err={err} />
    ) : (
      <>
        <ArticleCard {...article} loggedInUser={loggedInUser} />
        <CommentList article_id={article_id} loggedInUser={loggedInUser} />
      </>
    );
  }
}

export default SingleArticlePage;
