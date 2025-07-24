import type { Agent, AgentFilters, SortState } from '@/types/agent';
import agentsData from '@/assets/data/agents.json';

export class AgentsService {
    private agents: Agent[] = agentsData as Agent[];

    /**
     * Get all agents with optional filtering and sorting
     */
    async getAgents(filters?: AgentFilters, sort?: SortState): Promise<Agent[]> {
        let filteredAgents = [...this.agents];

        // Apply filters
        if (filters) {
            if (filters.status && filters.status !== 'all') {
                filteredAgents = filteredAgents.filter(agent => agent.status === filters.status);
            }

            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                filteredAgents = filteredAgents.filter(agent =>
                    agent.name.toLowerCase().includes(searchLower) ||
                    agent.phone.includes(filters.search!)
                );
            }

            if (filters.dateFrom || filters.dateTo) {
                filteredAgents = filteredAgents.filter(agent => {
                    const agentDate = new Date(agent.joinDate);
                    if (filters.dateFrom && agentDate < new Date(filters.dateFrom)) return false;
                    if (filters.dateTo && agentDate > new Date(filters.dateTo)) return false;
                    return true;
                });
            }
        }

        // Apply sorting
        if (sort && sort.column) {
            filteredAgents.sort((a, b) => {
                const aValue = a[sort.column!];
                const bValue = b[sort.column!];

                let comparison = 0;
                if (aValue < bValue) comparison = -1;
                if (aValue > bValue) comparison = 1;

                return sort.direction === 'desc' ? -comparison : comparison;
            });
        }

        return filteredAgents;
    }

    /**
     * Get agent by ID
     */
    async getAgentById(id: string): Promise<Agent | null> {
        return this.agents.find(agent => agent.id === id) || null;
    }

    /**
     * Delete agent by ID
     */
    async deleteAgent(id: string): Promise<boolean> {
        const index = this.agents.findIndex(agent => agent.id === id);
        if (index > -1) {
            this.agents.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Get WhatsApp link for agent
     */
    getWhatsAppLink(phone: string, message: string = 'Hello! I would like to discuss real estate services.'): string {
        const cleanPhone = phone.replace(/[^\d]/g, '');
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    }
}

// Export singleton instance
export const agentsService = new AgentsService(); 