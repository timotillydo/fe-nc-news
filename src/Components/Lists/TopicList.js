import React from "react";
import Loading from "../Loading";
import TopicCard from "../Cards/TopicCard";

const TopicList = ({ topics, isLoading }) => {
  return isLoading ? (
    <Loading />
  ) : (
    <div className="topic-list">
      {topics.map(topic => {
        return <TopicCard {...topic} key={topic.slug} />;
      })}
    </div>
  );
};

export default TopicList;
