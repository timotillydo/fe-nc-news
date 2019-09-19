import React, { Component } from "react";
import "../../styles/Article.css";
import * as api from "../../api";
import ArticleCard from "../Cards/ArticleCard";
import Loading from "../Loading";
import ArticleActionBar from "../ArticleActionBar";

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    sortBy: null,
    orderBy: null
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
      .catch(err => console.dir(err));
  };

  changeSortBy = (sort, order) => {
    this.setState({ sortBy: sort, orderBy: order });
  };

  render() {
    const { articles, isLoading } = this.state;
    return isLoading ? (
      <Loading />
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
