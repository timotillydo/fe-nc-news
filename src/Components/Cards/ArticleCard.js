import React from "react";
import { Link } from "@reach/router";
import Voting from "../Voting";

const ArticleCard = ({
  article_id,
  title,
  body,
  votes,
  topic,
  author,
  created_at,
  loggedInUser,
  removeArticle
}) => {
  const handleOnClick = e => {
    const article_id = e.target.value;
    window.confirm(
      "Are you sure you want to delete this article? All voting and comments for this article will be deleted from the server."
    ) && removeArticle(article_id);
  };
  return (
    <div className="card">
      <article>
        <header className="article-header">
          <div className="article-provenance">
            <h5>
              <Link to={`/topics/${topic}`}>from: {topic}</Link>
            </h5>
            <h5>
              <Link to={`/users/${author}`}>written by: @{author}</Link>
            </h5>
            <h5>published: {created_at || "Date not provided."}</h5>
          </div>
          <Link to={`/articles/${article_id}`}>
            <h3>{title}</h3>
          </Link>
        </header>
        <section>{body}</section>
      </article>
      <div className="article-actions">
        <Voting votes={votes} article_id={article_id} />
        {loggedInUser === author && (
          <button value={article_id} onClick={handleOnClick}>
            Delete Article
          </button>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
