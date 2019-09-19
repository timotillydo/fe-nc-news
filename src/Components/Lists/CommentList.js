import React, { Component } from "react";
import "../../styles/Comment.css";
import * as api from "../../api";
import CommentCard from "../Cards/CommentCard";
import Loading from "../Loading";
import AddComment from "../Forms/AddComment";

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

  insertComment = comment => {
    this.setState(currentState => {
      return {
        comments: [comment, ...currentState.comments],
        isLoading: false
      };
    });
  };

  removeComment = comment_id => {
    this.setState({ isLoading: true });
    api.deleteComment(comment_id).then(() => {
      this.setState(currentState => {
        return { commments: [...currentState.comments], isLoading: false };
      });
    });
  };

  render() {
    const { comments, isLoading } = this.state;
    const { article_id, loggedInUser } = this.props;
    return isLoading ? (
      <Loading />
    ) : (
      <div className="comment-list">
        <AddComment
          article_id={article_id}
          loggedInUser={loggedInUser}
          insertComment={this.insertComment}
        />
        {comments.map(comment => {
          return (
            <CommentCard
              {...comment}
              removeComment={this.removeComment}
              loggedInUser={loggedInUser}
              key={comment.comment_id}
            />
          );
        })}
      </div>
    );
  }
}

export default CommentList;
