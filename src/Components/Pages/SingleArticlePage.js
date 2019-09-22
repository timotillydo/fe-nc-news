import React, { Component } from "react";
import * as api from "../../api";
import ArticleCard from "../Cards/ArticleCard";
import CommentList from "../Lists/CommentList";
import Loading from "../Loading";

class SingleArticlePage extends Component {
  state = { article: {}, isLoading: true };

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
      .catch(err => console.dir(err));
  };

  render() {
    const { article, isLoading } = this.state;
    const { article_id, loggedInUser } = this.props;
    return isLoading ? (
      <Loading />
    ) : (
      <>
        <ArticleCard {...article} loggedInUser={loggedInUser} />
        <CommentList article_id={article_id} loggedInUser={loggedInUser} />
      </>
    );
  }
}

export default SingleArticlePage;
