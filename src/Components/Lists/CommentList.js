import React, { Component } from "react";
import "../../styles/Comment.css";
import * as api from "../../api";
import CommentCard from "../Cards/CommentCard";
import Loading from "../Loading";

class CommentList extends Component {
  state = {
    comments: [],
    isLoading: true
  };

  componentDidMount = () => {
    this.fetchComments();
  };

  fetchComments = () => {
    const { article_id } = this.props;
    api
      .getComments(article_id)
      .then(comments => {
        this.setState(currentState => {
          return { comments, isLoading: false };
        });
      })
      .catch(err => console.dir(err));
  };

  render() {
    const { comments, isLoading } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <div className="comment-list">
        {comments.map(comment => {
          return <CommentCard {...comment} key={comment.comment_id} />;
        })}
      </div>
    );
  }
}

export default CommentList;
