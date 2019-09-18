import React, { Component } from "react";
import * as api from "../../api";
import Header from "../Header";
import TopicList from "../TopicList";
import Toggler from "../Toggler";
import AddTopic from "../Forms/AddTopic";

class TopicsPage extends Component {
  state = { topics: [], isLoading: true };

  componentDidMount = () => {
    this.fetchTopics();
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.topics.length !== this.state.topics.length) {
      this.fetchTopics();
    }
  };

  fetchTopics = () => {
    api
      .getTopics()
      .then(topics => {
        this.setState(currentState => {
          return { topics, isLoading: false };
        });
      })
      .catch(err => console.dir(err));
  };

  insertTopic = topic => {
    this.setState(currentState => {
      return { ...currentState.topics, topic, isLoading: false };
    });
  };

  render() {
    const { topics, isLoading } = this.state;
    return (
      <>
        <Header />
        <header className="topics-header">
          <h2>Choose Your Topic</h2>
          <Toggler>
            {({ show, toggle }) => {
              return (
                <div>
                  <button onClick={toggle}>Add New Topic</button>
                  {show && <AddTopic insertTopic={this.insertTopic} />}
                </div>
              );
            }}
          </Toggler>
        </header>
        <TopicList topics={topics} isLoading={isLoading} />
      </>
    );
  }
}

export default TopicsPage;
