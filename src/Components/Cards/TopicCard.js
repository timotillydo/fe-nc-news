import React from "react";
import "../../styles/Topic.css";
import { Link } from "@reach/router";

const TopicCard = ({ slug, description }) => {
  return (
    <div className="topic-card">
      <h3>
        <Link className="slug" to={`/topics/${slug}`}>
          {slug}
        </Link>
      </h3>
      <h4>{description}</h4>
    </div>
  );
};

export default TopicCard;
