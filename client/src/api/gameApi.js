import api from "./axios";

export const getGames = async (params = {}) => {
  const response = await api.get("/games", {
    params,
  });

  return response.data;
};

export const getGameById = async (id) => {
  const response = await api.get(`/games/${id}`);

  return response.data;
};

export const getCategories = async () => {
  const response = await api.get("/categories");

  return response.data;
};

export const getGenres = async () => {
  const response = await api.get("/genres");

  return response.data;
};

export const getPlatforms = async () => {
  const response = await api.get("/platforms");

  return response.data;
};

export const getPublishers = async () => {
  const response = await api.get("/publishers");

  return response.data;
};