import React, { Component } from "react";
import * as api from "../../api";
import { Link, navigate } from "@reach/router";
import moment from "moment";
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
        this.setState({ article, isLoading: false, err: null });
      })
      .catch(err => {
        const { errMsg } = err.response.data;
        this.setState({ err: errMsg, isLoading: false });
      });
  };

  handleOnClick = e => {
    const article_id = e.target.value;
    window.confirm(
      "Are you sure you want to delete this article? All voting and comments for this article will be deleted from the server."
    ) && this.removeSingleArticle(article_id);
  };

  removeSingleArticle = article_id => {
    this.setState({ isLoading: true });
    api.deleteArticle(article_id).then(() => {
      navigate("/");
    });
  };

  render() {
    const {
      article: {
        article_id,
        title,
        body,
        votes,
        topic,
        author,
        created_at,
        comment_count
      },
      isLoading,
      err
    } = this.state;
    const { loggedInUser } = this.props;
    const time = moment(created_at).format("Do MMM YYYY");

    return isLoading ? (
      <Loading />
    ) : err ? (
      <DisplayError err={err} />
    ) : (
      <>
        <div>
          {loggedInUser === author && (
            <button
              className="delete-button"
              value={article_id}
              onClick={this.handleOnClick}
            >
              Delete Article
            </button>
          )}
          <article>
            <header className="card single-article">
              <div className="voting-title">
                <Voting votes={votes} article_id={article_id} />
                <div>
                  <h5 className="about-article">
                    {time} |{" "}
                    <Link className="topic-link" to={`/topics/${topic}`}>
                      {topic.toUpperCase()}
                    </Link>{" "}
                    |<span className="far fa-comments"></span>
                    {comment_count}
                  </h5>
                  <Link
                    className="article-title"
                    to={`/articles/${article_id}`}
                  >
                    <h3>{title}</h3>
                  </Link>
                </div>
              </div>
            </header>
            <section className="single-article-body">
              <h5 className="article-author">
                <span className="fas fa-pen-alt"></span>
                <Link className="author-link" to={`/users/${author}`}>
                  @{author}
                </Link>
              </h5>
              {body}
            </section>
          </article>
        </div>
        <CommentList
          article_id={article_id}
          comment_count={comment_count}
          loggedInUser={loggedInUser}
        />
      </>
    );
  }
}

export default SingleArticlePage;
