const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const API_KEY = process.env.EXPO_PUBLIC_MOVIE_API_KEY;

export const TMDB_API = {
  BASE_URL,
  API_KEY,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    accept: 'application/json'
  }
};

export const getMovie = async ({ query }: { query: string }) => {
  const requestUrl = `${TMDB_API.BASE_URL}/discover/movie?sort_by=popularity.desc`;
  
  const response = await fetch(requestUrl, {
    headers: TMDB_API.headers
  });

  if (!response.ok) throw new Error(response.statusText);
  const data = await response.json();
  return data;
};
