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
    const { topic, author } = this.props;
    api
      .getArticles(sortBy, orderBy, topic, author)
      .then(articles => {
        this.setState(currentState => {
          return {
            articles,
            isLoading: false,
            sortBy: null,
            orderBy: null,
            err: null
          };
        });
      })
      .catch(err => {
        const { errMsg } = err.response.data;
        this.setState({
          err: errMsg,
          isLoading: false,
          sortBy: null,
          orderBy: null
        });
      });
  };

  changeSortBy = (sort, order) => {
    this.setState({ sortBy: sort, orderBy: order });
  };

  removeArticle = article_id => {
    this.setState({ isLoading: true });
    api
      .deleteArticle(article_id)
      .then(() => {
        this.setState(currentState => {
          const newArticleArray = currentState.articles.filter(
            article => article.article_id !== parseInt(article_id)
          );
          return {
            articles: [...newArticleArray],
            isLoading: false
          };
        });
      })
      .catch(err => {
        const { errMsg } = err.response.data;
        this.setState({ err: errMsg, isLoading: false });
      });
  };

  render() {
    const { articles, isLoading, err } = this.state;
    const { loggedInUser } = this.props;
    return isLoading ? (
      <Loading />
    ) : err ? (
      <DisplayError err={err} />
    ) : (
      <>
        <ArticleActionBar changeSortBy={this.changeSortBy} />
        <div className="article-list">
          {articles.map(article => {
            return (
              <ArticleCard
                key={article.article_id}
                {...article}
                loggedInUser={loggedInUser}
                removeArticle={this.removeArticle}
              />
            );
          })}
        </div>
      </>
    );
  }
}

export default ArticleList;
