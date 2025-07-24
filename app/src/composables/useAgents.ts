import { ref, computed, watch } from 'vue';
import type { Agent, AgentFilters, SortState } from '@/types/agent';
import { agentsService } from '@/services/agentsService';

export function useAgents() {
    const agents = ref<Agent[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const filters = ref<AgentFilters>({});
    const sortState = ref<SortState>({ column: null, direction: 'asc' });

    // Computed filtered agents
    const filteredAgents = computed(() => {
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

    // Load agents data
    async function loadAgents() {
        try {
            loading.value = true;
            error.value = null;
            agents.value = await agentsService.getAgents();
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to load agents';
            console.error('Error loading agents:', err);
        } finally {
            loading.value = false;
        }
    }

    // Remove agent from local state
    function removeAgent(agentId: string) {
        const index = agents.value.findIndex(agent => agent.id === agentId);
        if (index > -1) {
            agents.value.splice(index, 1);
        }
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
        agents,
        filteredAgents,
        loading,
        error,
        filters,
        sortState,
        loadAgents,
        removeAgent,
        updateFilters,
        updateSort,
    };
} 