import React, { Component } from "react";
import * as api from "../../api";
import { Link } from "@reach/router";
import Loading from "../Loading";
import DisplayError from "../DisplayError";
import ArticleCard from "../Cards/ArticleCard";

class AddArticle extends Component {
  state = {
    topics: [],
    input: { title: "", topic: "", body: "" },
    isLoading: true,
    isSubmitted: false,
    newArticle: {},
    err: null
  };

  componentDidMount = () => {
    api
      .getTopics()
      .then(topics => {
        this.setState(currentState => {
          return {
            topics: topics,
            isLoading: false,
            input: { ...currentState.input },
            newArticle: { ...currentState.newArticle },
            isSubmitted: false,
            err: null
          };
        });
      })
      .catch(err => {
        const { errMsg } = err.response.data;
        this.setState(currentState => {
          return {
            err: errMsg,
            isLoading: false,
            input: { ...currentState.input },
            newArticle: { ...currentState.newArticle },
            isSubmitted: false
          };
        });
      });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(currentState => {
      return { input: { ...currentState.input, [name]: value } };
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, topic, body } = this.state.input;
    const { loggedInUser } = this.props;
    api
      .postArticle(title, body, loggedInUser, topic)
      .then(article => {
        this.setState(currentState => {
          return {
            isSubmitted: true,
            newArticle: {
              ...article
            },
            topics: [...currentState.topics],
            isLoading: false,
            input: { title: "", topic: "", body: "" },
            err: currentState.err
          };
        });
      })
      .catch(err => {
        const { errMsg } = err.response.data;
        this.setState(currentState => {
          return {
            err: errMsg,
            isLoading: false,
            input: { ...currentState.input },
            newArticle: { ...currentState.newArticle },
            isSubmitted: false
          };
        });
      });
  };

  render() {
    const {
      topics,
      input,
      isLoading,
      isSubmitted,
      err,
      newArticle
    } = this.state;
    return isLoading ? (
      <Loading />
    ) : isSubmitted ? (
      <div>
        <h2> Awesome! Your article (below) has been submitted.</h2>
        <div className="new-article">
          <ArticleCard {...newArticle} />
        </div>
        <Link to="/">Return To Home Page</Link>
      </div>
    ) : err ? (
      <DisplayError err={err} />
    ) : (
      <div className="add-article">
        <p>Fill in all fields below and then click Post Article:</p>
        <form className="add-article-form" onSubmit={this.handleSubmit}>
          <label>
            Title:
            <br />
            <input
              className="title-input"
              name="title"
              value={input.title}
              type="text"
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
            Topic:
            <br />
            <select
              className="topic-select"
              name="topic"
              value={input.topic}
              onChange={this.handleChange}
              required
            >
              <option value="" disabled hidden>
                Choose Topic
              </option>
              {topics.map(({ slug }) => {
                return (
                  <option key={slug} value={slug}>
                    {slug.toUpperCase()}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            Article Body:
            <br />
            <textarea
              className="article-input-body"
              name="body"
              value={input.body}
              type="text"
              onChange={this.handleChange}
              required
            />
          </label>
          <button
            className="post-article-button"
            type="submit"
            disabled={input.topic && input.body && input.title ? false : true}
          >
            Post Article
          </button>
        </form>
      </div>
    );
  }
}

export default AddArticle;
