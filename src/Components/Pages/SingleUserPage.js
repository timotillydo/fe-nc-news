import React, { Component } from "react";
import * as api from "../../api";
import ArticleList from "../Lists/ArticleList";
import UserCard from "../Cards/UserCard";
import DisplayError from "../DisplayError";
import Loading from "../Loading";

class SingleUserPage extends Component {
  state = { user: {}, isLoading: true, err: null };

  componentDidMount = () => {
    this.fetchUser();
  };

  fetchUser = () => {
    const { author } = this.props;
    api
      .getUser(author)
      .then(user => {
        this.setState({
          user: user,
          isLoading: false
        });
      })
      .catch(err => {
        const { errMsg } = err.response.data;
        this.setState({ err: errMsg, isLoading: false });
      });
  };

  render() {
    const { user, err, isLoading } = this.state;
    const { author } = this.props;
    return err ? (
      <DisplayError err={err} />
    ) : isLoading ? (
      <Loading />
    ) : (
      <>
        <UserCard {...user} />
        <ArticleList author={author} />
      </>
    );
  }
}

export default SingleUserPage;
