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
        <div className="about-comment">
          <Voting votes={votes} comment_id={comment_id} />
          <div className="sub-container">
            <h5 className="comment-info">
              {time} |
              <Link className="author-link" to={`/users/${author}`}>
                <span className="fas fa-pen-alt main-pen"></span>@{author}
              </Link>
              {loggedInUser === author && (
                <button
                  className="delete-button"
                  value={comment_id}
                  onClick={handleOnClick}
                >
                  Delete Comment
                </button>
              )}
            </h5>
            <section className="comment">{body}</section>
          </div>
        </div>
      </header>
    </div>
  );
};

export default CommentCard;
