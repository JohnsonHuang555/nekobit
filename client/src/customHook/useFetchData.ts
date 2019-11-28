import { useState, useEffect } from 'react';

const useFetchData = (initialData: any, apiMethods: () => Promise<any>) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const resultData = await apiMethods();
        setData(resultData);

      } catch (error) {
        setIsError(true)
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return [data, isLoading, isError];
}

export default useFetchData;
