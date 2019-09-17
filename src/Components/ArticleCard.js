import React from "react";

const ArticleCard = ({ title, body, votes, topic, author, created_at }) => {
  return (
    <div className="article-card">
      <article>
        <h2>{title}</h2>
        <section>{body}</section>
      </article>
    </div>
  );
};

export default ArticleCard;
