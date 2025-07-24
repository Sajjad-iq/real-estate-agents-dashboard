import { ref, computed } from 'vue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import type { Agent, AgentFilters, SortState } from '@/types/agent';
import { agentsService } from '@/services/agentsService';
import { queryKeys } from '@/lib/queryClient';

export function useAgents() {
    const filters = ref<AgentFilters>({});
    const sortState = ref<SortState>({ column: null, direction: 'asc' });
    const queryClient = useQueryClient();

    // Use TanStack Query for caching and data management
    const {
        data: agents,
        isLoading: loading,
        error,
        refetch: loadAgents
    } = useQuery({
        queryKey: queryKeys.agents.all(),
        queryFn: () => agentsService.getAgents(),
    });

    // Computed filtered agents
    const filteredAgents = computed(() => {
        if (!agents.value) return [];

        return agents.value.filter(agent => {
            // Status filter
            if (filters.value.status && filters.value.status !== 'all' && agent.status !== filters.value.status) {
                return false;
            }

            // Search filter
            if (filters.value.search) {
                const searchLower = filters.value.search.toLowerCase();
                if (!agent.name.toLowerCase().includes(searchLower) &&
                    !agent.phone.includes(filters.value.search)) {
                    return false;
                }
            }

            // Date range filter
            if (filters.value.dateFrom || filters.value.dateTo) {
                const agentDate = new Date(agent.joinDate);
                if (filters.value.dateFrom && agentDate < new Date(filters.value.dateFrom)) return false;
                if (filters.value.dateTo && agentDate > new Date(filters.value.dateTo)) return false;
            }

            return true;
        });
    });

    // Remove agent from cache and local state
    function removeAgent(agentId: string) {
        queryClient.setQueryData<Agent[]>(queryKeys.agents.all(), (oldData) => {
            if (!oldData) return [];
            return oldData.filter(agent => agent.id !== agentId);
        });
    }

    // Update agent in cache
    function updateAgent(updatedAgent: Agent) {
        queryClient.setQueryData<Agent[]>(queryKeys.agents.all(), (oldData) => {
            if (!oldData) return [updatedAgent];
            return oldData.map(agent =>
                agent.id === updatedAgent.id ? updatedAgent : agent
            );
        });
    }

    // Add new agent to cache
    function addAgent(newAgent: Agent) {
        queryClient.setQueryData<Agent[]>(queryKeys.agents.all(), (oldData) => {
            if (!oldData) return [newAgent];
            return [...oldData, newAgent];
        });
    }

    // Invalidate and refetch agents data
    function invalidateAgents() {
        queryClient.invalidateQueries({ queryKey: queryKeys.agents.all() });
    }

    // Update filters
    function updateFilters(newFilters: AgentFilters) {
        filters.value = { ...newFilters };
    }

    // Update sort state
    function updateSort(newSort: SortState) {
        sortState.value = { ...newSort };
    }

    return {
        agents: computed(() => agents.value || []),
        filteredAgents,
        loading,
        error,
        filters,
        sortState,
        loadAgents,
        removeAgent,
        updateAgent,
        addAgent,
        invalidateAgents,
        updateFilters,
        updateSort,
    };
} 