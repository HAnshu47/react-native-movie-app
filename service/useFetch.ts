// 封装一个处理异步请求的自定义 Hook

import { useCallback, useEffect, useRef, useState } from 'react';

// 支持两种类型：函数或 API 方法
type FetchFunction<T> = () => Promise<T>;
type APIMethod<T> = (...args: any[]) => Promise<T>;

const useFetch = <T>(
  fetchFunction: FetchFunction<T> | APIMethod<T>,
  autoFetch = true,
  ...args: any[]
) => {
  const [data, setData] = useState<T | null>(null); //请求结果

  // 使用 useRef 来存储最新的 args，避免依赖问题
  const argsRef = useRef(args);
  argsRef.current = args;

  // useCallback 类似 给函数加了缓存：
  const fetchData = useCallback(async () => {
    //触发请求
    try {
      const result = await fetchFunction(...argsRef.current);
      setData(result);
    } catch (error) {
      // 静默处理错误，不设置 error 状态
      console.error('API Error:', error);
    }
  }, [fetchFunction]); // 只依赖 fetchFunction，不依赖 args

  const reset = () => {
    setData(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]); //在组件挂载时，如果 autoFetch=true，就会自动执行一次 fetchData()。
  /** useeffect中依赖fetchData会无限触发
   *useCallback 会"记住"函数，只要依赖不变，函数的引用也不会变。
   *fetchData 在 fetchFunction 没变的情况下，始终指向同一个函数引用。
   *避免 useEffect 里 [fetchData] 导致无限触发。
   *避免子组件收到"新函数"而重复渲染。
   */
  return {
    data,
    fetchData,
    reset
  };
};

export default useFetch;
