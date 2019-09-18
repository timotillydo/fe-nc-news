import React, { Component } from "react";
import Loading from "./Loading";
import TopicCard from "./TopicCard";

class TopicList extends Component {
  state = {};
  render() {
    const { topics, isLoading } = this.props;
    return isLoading ? (
      <Loading />
    ) : (
      <div className="topic-list">
        {topics.map(topic => {
          return <TopicCard {...topic} key={topic.slug} />;
        })}
      </div>
    );
  }
}

export default TopicList;
