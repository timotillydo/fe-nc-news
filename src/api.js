import axios from "axios";

const request = axios.create({
  baseURL: "https://timotillydo-nc-news.herokuapp.com/api"
});

// GET REQs
export const getArticles = async (sort_by, order, topic, author) => {
  const { data } = await request.get("/articles", {
    params: { sort_by: sort_by, order: order, topic: topic, author: author }
  });
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
export const getUser = async username => {
  const { data } = await request.get(`/users/${username}`);
  return data.user;
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
export const postComment = async (body, username, article_id) => {
  const { data } = await request.post(`/articles/${article_id}/comments`, {
    body: body,
    username: username
  });
  return data.comment;
};
export const postArticle = async (title, body, author, topic) => {
  console.log("title, body, author, topic:", title, body, author, topic);
  const { data } = await request.post(`/articles`, {
    title: title,
    body: body,
    author: author,
    topic: topic
  });
  return data.article;
};

//PATCH REQs
export const patchArticleVotes = async ({ inc_votes }, article_id) => {
  const { data } = await request.patch(`/articles/${article_id}`, {
    inc_votes: inc_votes
  });
  return data.article;
};
export const patchCommentVotes = async ({ inc_votes }, comment_id) => {
  const { data } = await request.patch(`/comments/${comment_id}`, {
    inc_votes: inc_votes
  });
  return data.comment;
};

//DELETE REQs
export const deleteComment = async comment_id => {
  const { data } = await request.delete(`/comments/${comment_id}`);
  return data;
};
export const deleteArticle = async article_id => {
  const { data } = await request.delete(`/articles/${article_id}`);
  return data;
};
