import React, { Component } from "react";
import "../../styles/Article.css";
import * as api from "../../api";
import ArticleCard from "../Cards/ArticleCard";
import Loading from "../Loading";
import ArticleActionBar from "../ArticleActionBar";
import DisplayError from "../DisplayError";
import throttle from "lodash.throttle";

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    sortBy: null,
    orderBy: null,
    err: null,
    fetchMore: true,
    page: 1
  };

  componentDidMount = () => {
    this.fetchArticles();
    this.addScrollEventListener();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.topic !== this.props.topic) this.fetchArticles();
    if (prevState.sortBy !== this.state.sortBy) this.fetchArticles();
    if (prevState.orderBy !== this.state.orderBy) this.fetchArticles();
    if (this.state.fetchMore && prevState.page !== this.state.page) {
      this.fetchArticles();
    }
  };

  addScrollEventListener = () => {
    window.addEventListener("scroll", this.handleScroll);
  };

  handleScroll = throttle(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      console.log("scrolled");
      this.setState(currentState => {
        return {
          page: currentState.page + 1
        };
      });
    }
  }, 1500);

  fetchArticles = () => {
    const { sortBy, orderBy, page } = this.state;
    const { topic, author } = this.props;
    this.setState({ isLoading: true });
    api
      .getArticles(sortBy, orderBy, topic, author, page)
      .then(({ articles, total_count }) => {
        const getMoreArticles = total_count < page * 10;
        if (getMoreArticles) {
          this.setState({ fetchMore: false, isLoading: false });
        }
        this.setState(currentState => {
          return {
            articles: [...currentState.articles, ...articles],
            isLoading: false,
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
