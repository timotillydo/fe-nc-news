import axios from "axios";

const request = axios.create({
  baseURL: "https://timotillydo-nc-news.herokuapp.com/api"
});

// GET REQs
export const getArticles = async () => {
  const { data } = await request.get("/articles");
  return data.articles;
};
export const getArticle = async article_id => {
  const { data } = await request.get(`/articles/${article_id}`);
  return data.article;
};
export const getTopics = async () => {
  const { data } = await request.get("/topics");
  return data.topics;
};
export const getUsers = async () => {
  const { data } = await request.get("/users");
  return data.users;
};
export const getComments = async article_id => {
  const { data } = await request.get(`/articles/${article_id}/comments`);
  return data.comments;
};

//POST REQs

export const postTopic = async (slug, description) => {
  const { data } = await request.post("/topics", { slug, description });
  return data.topic;
};
