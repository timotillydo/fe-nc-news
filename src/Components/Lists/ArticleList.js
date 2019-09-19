import React, { Component } from "react";
import "../../styles/Article.css";
import * as api from "../../api";
import ArticleCard from "../Cards/ArticleCard";
import Loading from "../Loading";

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true
  };

  componentDidMount = () => {
    this.fetchArticles();
  };

  componentDidUpdate = prevProps => {
    if (prevProps.topic !== this.props.topic) this.fetchArticles();
  };

  fetchArticles = () => {
    const { topic } = this.props;
    api
      .getArticles(topic)
      .then(articles => {
        this.setState(currentState => {
          return { articles, isLoading: false };
        });
      })
      .catch(err => console.dir(err));
  };

  render() {
    const { articles, isLoading } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <div className="article-list">
        {articles.map(article => {
          return <ArticleCard {...article} key={article.article_id} />;
        })}
      </div>
    );
  }
}

export default ArticleList;
