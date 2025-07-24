import { QueryClient } from '@tanstack/vue-query'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes (cache time)
            retry: 3,
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            refetchOnWindowFocus: false, // Disable refetch on window focus for better UX
            refetchOnMount: true,
            refetchOnReconnect: true,
        },
        mutations: {
            retry: 1,
        },
    },
})

// Query keys factory for consistent key management
export const queryKeys = {
    agents: {
        all: () => ['agents'] as const,
        detail: (id: string) => ['agents', id] as const,
        properties: (agentId: string) => ['agents', agentId, 'properties'] as const,
    },
    properties: {
        all: () => ['properties'] as const,
        detail: (id: string) => ['properties', id] as const,
        byAgent: (agentId: string) => ['properties', 'agent', agentId] as const,
    },
} as const 