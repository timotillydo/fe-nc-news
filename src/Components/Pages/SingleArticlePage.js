import React, { Component } from "react";
import * as api from "../../api";
import { Link, navigate } from "@reach/router";
import CommentList from "../Lists/CommentList";
import Loading from "../Loading";
import DisplayError from "../DisplayError";
import Voting from "../Voting";

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

  handleOnClick = e => {
    const article_id = e.target.value;
    this.removeSingleArticle(article_id);
  };

  removeSingleArticle = article_id => {
    this.setState({ isLoading: true });
    api.deleteArticle(article_id).then(() => {
      navigate("/");
    });
  };

  render() {
    const {
      article: { article_id, title, body, votes, topic, author, created_at },
      isLoading,
      err
    } = this.state;
    const { loggedInUser } = this.props;
    return isLoading ? (
      <Loading />
    ) : err ? (
      <DisplayError err={err} />
    ) : (
      <>
        <article>
          <header className="article-header">
            <div className="article-provenance">
              <h5>
                <Link to={`/topics/${topic}`}>from: {topic}</Link>
              </h5>
              <h5>
                <Link to={`/users/${author}`}>written by: @{author}</Link>
              </h5>
              <h5>published: {created_at || "Date not provided."}</h5>
            </div>
            <Link to={`/articles/${article_id}`}>
              <h3>{title}</h3>
            </Link>
          </header>
          <section>{body}</section>
        </article>
        <div className="article-actions">
          <Voting votes={votes} article_id={article_id} />
          {loggedInUser === author && (
            <button value={article_id} onClick={this.handleOnClick}>
              Delete Article
            </button>
          )}
        </div>
        <CommentList article_id={article_id} loggedInUser={loggedInUser} />
      </>
    );
  }
}

export default SingleArticlePage;
