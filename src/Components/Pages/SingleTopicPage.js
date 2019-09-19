import React from "react";
import Header from "../Header";
import ArticleList from "../Lists/ArticleList";

const SingleTopicPage = ({ topic, topics }) => {
  return (
    <>
      <Header />
      <h2>Article Topic: {topic.toUpperCase()}</h2>
      {/* <input list="topics" />
      <datalist>
        {topics.map(singleTopic => {
          return <option value={singleTopic}></option>;
        })}
      </datalist> */}
      <ArticleList topic={topic} />
    </>
  );
};

export default SingleTopicPage;
