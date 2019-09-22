import React, { Component } from "react";
import * as api from "../api";
import DisplayError from "./DisplayError";

class Voting extends Component {
  state = { increment: 0, err: null, isLoading: false };

  updateVote = vote => {
    const { article_id, comment_id } = this.props;
    this.setState(currentState => {
      return {
        increment: currentState.increment + vote,
        err: null,
        isLoading: true
      };
    });
    if (article_id) {
      api.patchArticleVotes({ inc_votes: vote }, article_id).catch(err => {
        const { errMsg } = err.response.data;
        this.setState(currentState => {
          return {
            increment: currentState.increment - vote,
            err: errMsg,
            isLoading: false
          };
        });
      });
    } else {
      api.patchCommentVotes({ inc_votes: vote }, comment_id).catch(err => {
        const { errMsg } = err.response.data;
        this.setState(currentState => {
          return {
            increment: currentState.increment - vote,
            err: errMsg,
            isLoading: false
          };
        });
      });
    }
  };

  render() {
    const { increment, err } = this.state;
    const { votes } = this.props;

    return (
      <>
        {err && <DisplayError err={err} />}
        <label className="voting">
          <button
            className="up"
            onClick={() => {
              this.updateVote(1);
            }}
          >
            Yeh
          </button>
          <div className="votes">{votes + increment}</div>
          <button
            className="down"
            onClick={() => {
              this.updateVote(-1);
            }}
          >
            Nah
          </button>
        </label>
      </>
    );
  }
}

export default Voting;
