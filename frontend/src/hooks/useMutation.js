import { useState, useCallback } from 'react';

/**
 * Mutation hook for POST/PATCH/DELETE
 */
export function useMutation(mutateFn) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const res = await mutateFn(...args);
        return res.data?.data ?? res.data;
      } catch (err) {
        const msg = err?.response?.data?.message ?? err.message ?? 'Something went wrong';
        setError(msg);
        throw new Error(msg);
      } finally {
        setLoading(false);
      }
    },
    [mutateFn]
  );

  return { mutate, loading, error };
}
