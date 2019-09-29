import React from "react";
import "../../styles/User.css";
import { Link } from "@reach/router";

const UserCard = ({ username, avatar_url, name }) => {
  return (
    <div className="card user">
      {avatar_url && (
        <img src={`${avatar_url}`} alt="user's avatar" className="avatar-img" />
      )}
      <ul className="user-info">
        <li>
          <h2>
            <Link
              to={`/users/${username}`}
              className="username"
            >{`@${username}`}</Link>
          </h2>
        </li>
        <li className="name">
          <h3>{name}</h3>
        </li>
        <div>
          {/* <li className="artilcle-count">article_count</li>
          <li className="best-article">highest_respect_article</li> */}
        </div>
      </ul>
    </div>
  );
};

export default UserCard;
