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
  created_at
}) => {
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
            <h5>published: {created_at}</h5>
          </div>
          <Link to={`/articles/${article_id}`}>
            <h3>{title}</h3>
          </Link>
        </header>
        <section>{body}</section>
      </article>
      <Voting votes={votes} article_id={article_id} />
    </div>
  );
};

export default ArticleCard;
