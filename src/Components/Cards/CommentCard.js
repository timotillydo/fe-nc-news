import React from "react";
import { Link } from "@reach/router";
import Voting from "../Voting";
import moment from "moment";

const CommentCard = ({
  comment_id,
  author,
  body,
  created_at,
  votes,
  loggedInUser,
  removeComment
}) => {
  const handleOnClick = e => {
    const { value } = e.target;
    window.confirm("Are you sure you want to delete this comment?") &&
      removeComment(value);
  };
  const time = moment(created_at).format("Do MMM YYYY");

  return (
    <div className="card">
      <header className="comment-header">
        <Voting votes={votes} comment_id={comment_id} />
        <div>
          <div className="about-comment">
            <h5 className="comment-time">{time}|</h5>
            <span className="fas fa-pen-alt pen"></span>
            <Link className="author-link" to={`/users/${author}`}>
              @{author}|
            </Link>
          </div>
          <section className="comment-body">{body}</section>
        </div>
        {loggedInUser === author && (
          <button
            className="delete-button"
            value={comment_id}
            onClick={handleOnClick}
          >
            Delete Comment
          </button>
        )}
      </header>
    </div>
  );
};

export default CommentCard;
