import React from "react";
import moment from "moment";
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
  comment_count,
  loggedInUser,
  removeArticle
}) => {
  const time = moment(created_at).format("Do MMM YYYY");
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
          <div className="voting-title">
            <Voting votes={votes} article_id={article_id} />
            <div>
              <h5 className="about-article">
                {time} |{" "}
                <Link className="topic-link" to={`/topics/${topic}`}>
                  {topic}
                </Link>{" "}
                |<span className="far fa-comments"></span>
                {comment_count}|
                {loggedInUser === author && (
                  <button
                    className="delete-button"
                    value={article_id}
                    onClick={handleOnClick}
                  >
                    Delete Article
                  </button>
                )}
              </h5>

              <Link className="article-title" to={`/articles/${article_id}`}>
                <h3>{title}</h3>
              </Link>
              <h5 className="author">
                <span class="fas fa-pen-alt"></span>
                <Link className="author-link" to={`/users/${author}`}>
                  @{author}
                </Link>
              </h5>
            </div>
          </div>
        </header>
        <section className="article-intro">{body}</section>
      </article>
    </div>
  );
};

export default ArticleCard;
