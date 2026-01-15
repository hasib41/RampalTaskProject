/**
 * Custom hooks for API data fetching.
 * Provides loading states and error handling.
 */

import { useState, useEffect } from 'react';
import {
    getTenders, getNews, getFeaturedNews, getCareers, getProjectStats,
    getSustainabilityStats, getCSRInitiatives,
} from '../services/api';
import type { Tender, News, Career, ProjectStat, SustainabilityStat, CSRInitiative } from '../services/api';

// ... (existing useApiData hook)

// ... (existing hooks)

/**
 * Hook to fetch sustainability stats
 */
export function useSustainabilityStats() {
    return useApiData<SustainabilityStat[]>(getSustainabilityStats);
}

/**
 * Hook to fetch CSR initiatives
 */
export function useCSRInitiatives() {
    return useApiData<CSRInitiative[]>(getCSRInitiatives);
}


// Generic hook for API calls
function useApiData<T>(fetchFn: () => Promise<T>, dependencies: unknown[] = []) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            try {
                setLoading(true);
                setError(null);
                const result = await fetchFn();
                if (isMounted) {
                    setData(result);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'An error occurred');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);

    return { data, loading, error, refetch: () => { } };
}

/**
 * Hook to fetch tenders
 */
export function useTenders() {
    return useApiData<Tender[]>(getTenders);
}

/**
 * Hook to fetch news articles
 */
export function useNews() {
    return useApiData<News[]>(getNews);
}

/**
 * Hook to fetch featured news
 */
export function useFeaturedNews() {
    return useApiData<News[]>(getFeaturedNews);
}

/**
 * Hook to fetch careers/jobs
 */
export function useCareers() {
    return useApiData<Career[]>(getCareers);
}

/**
 * Hook to fetch project stats
 */
export function useProjectStats() {
    return useApiData<ProjectStat[]>(getProjectStats);
}
