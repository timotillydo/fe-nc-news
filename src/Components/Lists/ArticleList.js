import React, { Component } from "react";
import "../../styles/Article.css";
import * as api from "../../api";
import ArticleCard from "../Cards/ArticleCard";
import Loading from "../Loading";
import ArticleActionBar from "../ArticleActionBar";
import DisplayError from "../DisplayError";

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    sortBy: null,
    orderBy: null,
    err: null
  };

  componentDidMount = () => {
    this.fetchArticles();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.topic !== this.props.topic) this.fetchArticles();
    if (prevState.sortBy !== this.state.sortBy) this.fetchArticles();
    if (prevState.orderBy !== this.state.orderBy) this.fetchArticles();
  };

  fetchArticles = () => {
    const { sortBy, orderBy } = this.state;
    const { topic } = this.props;
    api
      .getArticles(sortBy, orderBy, topic)
      .then(articles => {
        this.setState(currentState => {
          return { articles, isLoading: false };
        });
      })
      .catch(err => {
        const { errMsg } = err.response.data;
        this.setState({ err: errMsg, isLoading: false });
      });
  };

  changeSortBy = (sort, order) => {
    this.setState({ sortBy: sort, orderBy: order });
  };

  render() {
    const { articles, isLoading, err } = this.state;
    return isLoading ? (
      <Loading />
    ) : err ? (
      <DisplayError err={err} />
    ) : (
      <>
        <ArticleActionBar changeSortBy={this.changeSortBy} />
        <div className="article-list">
          {articles.map(article => {
            return <ArticleCard {...article} key={article.article_id} />;
          })}
        </div>
      </>
    );
  }
}

export default ArticleList;
