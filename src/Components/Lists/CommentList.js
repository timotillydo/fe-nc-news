import React, { Component } from "react";
import "../../styles/Comment.css";
import * as api from "../../api";
import CommentCard from "../Cards/CommentCard";
import Loading from "../Loading";
import AddComment from "../Forms/AddComment";
import DisplayError from "../DisplayError";

class CommentList extends Component {
  state = {
    comments: [],
    isLoading: true,
    err: null
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
      .catch(err => {
        const { errMsg } = err.response.data;
        this.setState({ err: errMsg, isLoading: false });
      });
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
    api
      .deleteComment(comment_id)
      .then(() => {
        this.setState(currentState => {
          const newCommentArray = currentState.comments.filter(
            comment => comment.comment_id !== parseInt(comment_id)
          );

          return {
            comments: [...newCommentArray],
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
    const { comments, isLoading, err } = this.state;
    const { article_id, loggedInUser } = this.props;
    return isLoading ? (
      <Loading />
    ) : err ? (
      <DisplayError err={err} />
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
