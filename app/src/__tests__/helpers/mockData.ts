import type { Agent } from '../../types/agent'
import type { Property } from '../../types/property'
import agentsData from '../../assets/data/agents.json'
import propertiesData from '../../assets/data/properties.json'

// Export the actual data for testing
export const testAgents: Agent[] = agentsData as Agent[]
export const testProperties: Property[] = propertiesData as Property[]

// Helper functions for testing
export const getTestAgent = (id?: string): Agent => {
    if (id) {
        const agent = testAgents.find(a => a.id === id)
        if (!agent) throw new Error(`Test agent with id ${id} not found`)
        return agent
    }
    return testAgents[0]
}

export const getTestProperty = (id?: string): Property => {
    if (id) {
        const property = testProperties.find(p => p.id === id)
        if (!property) throw new Error(`Test property with id ${id} not found`)
        return property
    }
    return testProperties[0]
}

export const getTestAgentsByStatus = (status: Agent['status']): Agent[] => {
    return testAgents.filter(agent => agent.status === status)
}

export const getTestPropertiesByAgent = (agentId: string): Property[] => {
    return testProperties.filter(property => property.agentId === agentId)
} 