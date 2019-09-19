import React from "react";
import "../../styles/Topic.css";
import { Link } from "@reach/router";

const TopicCard = ({ slug, description }) => {
  return (
    <div className="card">
      <h3 className="slug">
        <Link to={`/topics/${slug}`}>{slug}</Link>
      </h3>
      <h4>{description}</h4>
    </div>
  );
};

export default TopicCard;
