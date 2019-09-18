import React from "react";
import "../styles/TopicCard.css";
import { Link } from "@reach/router";

const TopicCard = ({ slug, description }) => {
  return (
    <div className="topic-card">
      <h3 className="slug">
        <Link to={`/home/${slug}`}>{slug}</Link>
      </h3>
      <h4>{description}</h4>
    </div>
  );
};

export default TopicCard;
