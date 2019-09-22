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
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            name="title"
            value={input.title}
            type="text"
            placeholder="Choose a title"
            onChange={this.handleChange}
            required
          />
        </label>
        <label>
          <select
            name="topic"
            value={input.topic}
            placeholder="Choose a topic"
            onChange={this.handleChange}
            required
          >
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
          <input
            name="body"
            value={input.body}
            type="text"
            placeholder="Write your article here..."
            onChange={this.handleChange}
            required
          />
        </label>
        <button type="submit">Post Article</button>
      </form>
    );
  }
}

export default AddArticle;
