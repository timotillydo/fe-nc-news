import React, { Component } from "react";
import "../../styles/Article.css";
import * as api from "../../api";
import ArticleCard from "../Cards/ArticleCard";
import Loading from "../Loading";
import ArticleActionBar from "../ArticleActionBar";
import DisplayError from "../DisplayError";
import debounce from "lodash.debounce";

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    sortBy: null,
    orderBy: null,
    err: null,
    fetchMore: true,
    limit: 10
  };

  componentDidMount = () => {
    this.fetchArticles();
    this.addScrollEventListener();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.topic !== this.props.topic) this.fetchArticles();
    if (prevState.sortBy !== this.state.sortBy) this.fetchArticles();
    if (prevState.orderBy !== this.state.orderBy) this.fetchArticles();
    if (this.state.fetchMore && prevState.limit !== this.state.limit) {
      this.fetchArticles();
    }
  };

  addScrollEventListener = () => {
    window.addEventListener("scroll", this.handleScroll);
  };

  handleScroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      this.setState(currentState => {
        return {
          limit: currentState.limit + 10
        };
      });
    }
  }, 2000);

  fetchArticles = () => {
    const { sortBy, orderBy, limit } = this.state;
    const { topic, author } = this.props;
    this.setState({ isLoading: true });
    api
      .getArticles(sortBy, orderBy, topic, author, limit)
      .then(({ articles, total_count }) => {
        const noMoreFetching = total_count < limit;
        if (noMoreFetching) {
          this.setState({ fetchMore: false, isLoading: false });
        }
        this.setState(currentState => {
          return {
            articles: [...articles],
            isLoading: false,
            sortBy: currentState.sortBy,
            orderBy: currentState.orderBy,
            err: null,
            fetchMore: currentState.fetchMore,
            limit: currentState.limit
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
    this.setState({
      articles: [],
      sortBy: sort,
      orderBy: order,
      page: 1,
      fetchMore: true,
      isLoading: true,
      err: null
    });
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
