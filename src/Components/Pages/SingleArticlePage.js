import React, { Component } from "react";
import * as api from "../../api";
import Header from "../Header";
import ArticleCard from "../ArticleCard";
import CommentList from "../CommentList";
import Loading from "../Loading";

class SingleArticlePage extends Component {
  state = { article: {}, isLoading: true };

  componentDidMount = () => {
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
    const { article_id } = this.props;
    return isLoading ? (
      <Loading />
    ) : (
      <>
        <Header />
        <ArticleCard {...article} />
        <CommentList article_id={article_id} />
      </>
    );
  }
}

export default SingleArticlePage;
