// 常用的 API 方法，让调用更简洁
import { requestAPI } from './request';

// 获取热门电影
export const getPopularMovies = (query: any) =>
  requestAPI({
    url: '/discover/movie',
    query
  });

export const getMovieDetails = (query: any) =>
  requestAPI({
    url: `/movie/${query.id}`,
    query
  });
