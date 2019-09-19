import React from "react";
import { Link } from "@reach/router";

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
  return (
    <div className="card">
      <header className="comment-header">
        <div className="comment-provenance">
          <h5>
            <Link to="/users/:user_id">written by: {author}</Link>
          </h5>
          <h5>{created_at}</h5>
        </div>
      </header>
      <section>{body}</section>
      <div className="comment-actions">
        <label>
          respect:
          <div className="votes">{votes}</div>
          <button>Yeh</button>
          <button>Nah</button>
        </label>
        {loggedInUser === author && (
          <button value={comment_id} onClick={handleOnClick}>
            Delete Comment
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
