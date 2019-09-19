import axios from "axios";

const request = axios.create({
  baseURL: "https://timotillydo-nc-news.herokuapp.com/api"
});

// GET REQs
export const getArticles = async topic => {
  const { data } = await request.get("/articles", { params: { topic: topic } });
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
export const postUser = async (newUsername, newAvatarUrl, newName) => {
  const { data } = await request.post("/users", {
    username: newUsername,
    avatar_url: newAvatarUrl,
    name: newName
  });
  return data.user;
};
