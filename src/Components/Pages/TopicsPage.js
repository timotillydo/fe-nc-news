import React, { Component } from "react";
import * as api from "../../api";
import TopicList from "../Lists/TopicList";
import Toggler from "../Toggler";
import AddTopic from "../Forms/AddTopic";
import DisplayError from "../DisplayError";

class TopicsPage extends Component {
  state = { topics: [], isLoading: true, err: null };

  componentDidMount = () => {
    this.fetchTopics();
  };

  fetchTopics = () => {
    api
      .getTopics()
      .then(topics => {
        this.setState(currentState => {
          return { topics, isLoading: false };
        });
      })
      .catch(err => {
        const { errMsg } = err.response.data;
        this.setState({ err: errMsg, isLoading: false });
      });
  };

  insertTopic = topic => {
    this.setState(currentState => {
      return { topics: [topic, ...currentState.topics], isLoading: false };
    });
  };

  render() {
    const { topics, isLoading, err } = this.state;
    return err ? (
      <DisplayError err={err} />
    ) : (
      <>
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
