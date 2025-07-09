import { useState, useEffect, useCallback } from 'react';

export const useFetch = (apiCall, dependencies = []) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await apiCall();
            setData(result);
        } catch (err) {
            setError(err.response?.data?.message || 'Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    }, dependencies);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refetch = () => {
        fetchData();
    };

    return { data, loading, error, refetch };
};

// Hook cho mutation (POST, PUT, DELETE)
export const useMutation = (apiCall) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const mutate = useCallback(async (...args) => {
        try {
            setLoading(true);
            setError(null);
            const result = await apiCall(...args);
            setData(result);
            return result;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Có lỗi xảy ra';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [apiCall]);

    return { mutate, loading, error, data };
};

// Hook cho infinite scroll
export const useInfiniteFetch = (apiCall, pageSize = 10) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const fetchMore = useCallback(async (reset = false) => {
        if (loading || (!hasMore && !reset)) return;

        try {
            setLoading(true);
            setError(null);

            const currentPage = reset ? 1 : page;
            const result = await apiCall({ page: currentPage, per_page: pageSize });

            if (reset) {
                setData(result.data || result);
                setPage(1);
            } else {
                setData(prev => [...prev, ...(result.data || result)]);
                setPage(prev => prev + 1);
            }

            setHasMore((result.data || result).length === pageSize);
        } catch (err) {
            setError(err.response?.data?.message || 'Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    }, [apiCall, page, pageSize, loading, hasMore]);

    const reset = useCallback(() => {
        setData([]);
        setPage(1);
        setHasMore(true);
        setError(null);
        fetchMore(true);
    }, [fetchMore]);

    useEffect(() => {
        reset();
    }, []);

    return { data, loading, error, hasMore, fetchMore, reset };
};
