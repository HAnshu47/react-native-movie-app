import { useEffect, useState } from 'react';
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(autoFetch);
  const fetchData = async () => {
    try {
      setError(null);
      setLoading(true);
      const result = await fetchFunction();
      setData(result);
    } catch (error) {
      //@ts-ignore
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch]);

  return {
    data,
    error,
    loading,
    useFetch,
    fetchData,
    reset
  };
};

export default useFetch;
