import React from "react";
import ArticleList from "../Lists/ArticleList";

const SingleTopicPage = ({ topic, topics }) => {
  return (
    <>
      <h2>Articles from: {topic.toUpperCase()}</h2>
      {/* <select />
        {topics.map(singleTopic => {
          return <option value={singleTopic}></option>;
        })}
      </select> */}
      <ArticleList topic={topic} />
    </>
  );
};

export default SingleTopicPage;
