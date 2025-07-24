import agentsData from '@/assets/data/agents.json'
import type { Agent } from '@/types/agent'

class AgentsService {
    async getAgents(): Promise<Agent[]> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 100))
        return agentsData as Agent[]
    }

    async getAgentById(id: string): Promise<Agent | null> {
        await new Promise(resolve => setTimeout(resolve, 100))
        const agents = agentsData as Agent[]
        return agents.find(agent => agent.id === id) || null
    }

    async updateAgent(id: string, updates: Partial<Agent>): Promise<Agent | null> {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))

        // In real implementation, this would make an API call
        const agents = agentsData as Agent[]
        const agentIndex = agents.findIndex(agent => agent.id === id)

        if (agentIndex === -1) {
            return null
        }

        // Update the agent with new data
        const updatedAgent = { ...agents[agentIndex], ...updates, id }

        // In a real app, you'd persist this to your backend
        console.log(`Updating agent with id: ${id}`, updates)

        return updatedAgent
    }

    async deleteAgent(id: string): Promise<boolean> {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        // In real implementation, this would make an API call
        console.log(`Deleting agent with id: ${id}`)
        return true
    }

    getWhatsAppLink(phone: string): string {
        const cleanPhone = phone.replace(/\s+/g, '').replace(/^\+/, '')
        return `https://wa.me/${cleanPhone}`
    }
}

export const agentsService = new AgentsService() 