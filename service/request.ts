const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const API_KEY = process.env.EXPO_PUBLIC_MOVIE_API_KEY;

export const TMDB_API = {
  BASE_URL,
  API_KEY,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

type APIParams = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  query?: Record<string, string | number | boolean | undefined>;
  body?: any;
  options?: RequestInit; // 额外 fetch 配置
};

export const requestAPI = async ({
  url,
  method = 'GET',
  query,
  body,
  options
}: APIParams) => {
  if (!TMDB_API.BASE_URL) {
    throw new Error('BASE_URL is not defined. Please check your .env file.');
  }

  // 处理 query，get请求需要转对象为拼接string参数
  const params = query
    ? new URLSearchParams(
        Object.entries(query).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null) {
            acc[key] = String(value);
          }
          return acc;
        }, {} as Record<string, string>)
      ).toString()
    : '';

  const requestUrl = `${TMDB_API.BASE_URL.replace(/\/$/, '')}/${url.replace(
    /^\//,
    ''
  )}${params && method === 'GET' ? `?${params}` : ''}`;

  // fetch 配置
  const fetchOptions: RequestInit = {
    method,
    headers: TMDB_API.headers,
    ...options
  };

  //  POST/PUT/DELETE 请求，需要添加 body
  if (method !== 'GET' && body) {
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(requestUrl, fetchOptions);

  if (!response.ok) {
    const errorText = await response.text().catch(() => response.statusText);
    throw new Error(
      `API Error ${response.status}: ${errorText || response.statusText}`
    );
  }

  return response.json();
};


