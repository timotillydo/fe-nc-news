import React from "react";
import { Link } from "@reach/router";

const CommentCard = ({ author, body, created_at, votes }) => {
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
      </div>
    </div>
  );
};

export default CommentCard;
