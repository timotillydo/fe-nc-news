import axios from "axios";

const request = axios.create({
  baseURL: "https://timotillydo-nc-news.herokuapp.com/api"
});

export const getArticles = async () => {
  const { data } = await request.get("/articles");
  return data.articles;
};
