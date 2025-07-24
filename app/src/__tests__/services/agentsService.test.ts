import { describe, it, expect, vi, beforeEach } from 'vitest'
import { agentsService } from '../../services/agentsService'

// Mock the agents data import - mock data must be inside the factory function
vi.mock('../../assets/data/agents.json', () => ({
    default: [
        {
            id: 'test-agent-1',
            name: 'Test Agent 1',
            phone: '+1234567890',
            address: 'Test Address 1',
            joinDate: '2023-01-15',
            propertiesCount: 25,
            branchesCount: 3,
            employeesCount: 12,
            subscriptionTotal: 5000,
            status: 'active'
        },
        {
            id: 'test-agent-2',
            name: 'Test Agent 2',
            phone: '+0987654321',
            address: 'Test Address 2',
            joinDate: '2023-06-20',
            propertiesCount: 18,
            branchesCount: 2,
            employeesCount: 8,
            subscriptionTotal: 3500,
            status: 'pending'
        }
    ]
}))

// Define mock data for use in tests (same as above but accessible in test context)
const mockAgents = [
    {
        id: 'test-agent-1',
        name: 'Test Agent 1',
        phone: '+1234567890',
        address: 'Test Address 1',
        joinDate: '2023-01-15',
        propertiesCount: 25,
        branchesCount: 3,
        employeesCount: 12,
        subscriptionTotal: 5000,
        status: 'active' as const
    },
    {
        id: 'test-agent-2',
        name: 'Test Agent 2',
        phone: '+0987654321',
        address: 'Test Address 2',
        joinDate: '2023-06-20',
        propertiesCount: 18,
        branchesCount: 2,
        employeesCount: 8,
        subscriptionTotal: 3500,
        status: 'pending' as const
    }
]

describe('AgentsService', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('getAgents', () => {
        it('should return all agents after simulated delay', async () => {
            const startTime = Date.now()
            const agents = await agentsService.getAgents()
            const endTime = Date.now()

            expect(agents).toEqual(mockAgents)
            expect(agents.length).toBeGreaterThan(0)
            expect(endTime - startTime).toBeGreaterThanOrEqual(100)
        })

        it('should return agents with correct structure', async () => {
            const agents = await agentsService.getAgents()
            const firstAgent = agents[0]

            expect(firstAgent).toHaveProperty('id')
            expect(firstAgent).toHaveProperty('name')
            expect(firstAgent).toHaveProperty('phone')
            expect(firstAgent).toHaveProperty('address')
            expect(firstAgent).toHaveProperty('joinDate')
            expect(firstAgent).toHaveProperty('propertiesCount')
            expect(firstAgent).toHaveProperty('branchesCount')
            expect(firstAgent).toHaveProperty('employeesCount')
            expect(firstAgent).toHaveProperty('subscriptionTotal')
            expect(firstAgent).toHaveProperty('status')
        })
    })

    describe('getAgentById', () => {
        it('should return agent when valid ID is provided', async () => {
            const testAgent = mockAgents[0]
            const agent = await agentsService.getAgentById(testAgent.id)

            expect(agent).toEqual(testAgent)
        })

        it('should return null when invalid ID is provided', async () => {
            const agent = await agentsService.getAgentById('non-existent-id')

            expect(agent).toBeNull()
        })

        it('should simulate API delay', async () => {
            const startTime = Date.now()
            await agentsService.getAgentById(mockAgents[0].id)
            const endTime = Date.now()

            expect(endTime - startTime).toBeGreaterThanOrEqual(100)
        })
    })

    describe('updateAgent', () => {
        it('should update agent and return updated data', async () => {
            const testAgent = mockAgents[0]
            const updates = { name: 'Updated Name', phone: '+9999999999' }

            const updatedAgent = await agentsService.updateAgent(testAgent.id, updates)

            expect(updatedAgent).toBeTruthy()
            expect(updatedAgent?.id).toBe(testAgent.id)
            expect(updatedAgent?.name).toBe(updates.name)
            expect(updatedAgent?.phone).toBe(updates.phone)
            expect(updatedAgent?.address).toBe(testAgent.address) // unchanged field
        })

        it('should return null when updating non-existent agent', async () => {
            const updates = { name: 'Updated Name' }

            const result = await agentsService.updateAgent('non-existent-id', updates)

            expect(result).toBeNull()
        })

        it('should preserve agent ID even if provided in updates', async () => {
            const testAgent = mockAgents[0]
            const updates = { id: 'different-id', name: 'Updated Name' }

            const updatedAgent = await agentsService.updateAgent(testAgent.id, updates)

            expect(updatedAgent?.id).toBe(testAgent.id)
            expect(updatedAgent?.name).toBe(updates.name)
        })

        it('should simulate API delay', async () => {
            const testAgent = mockAgents[0]
            const startTime = Date.now()
            await agentsService.updateAgent(testAgent.id, { name: 'Test' })
            const endTime = Date.now()

            expect(endTime - startTime).toBeGreaterThanOrEqual(500)
        })
    })

    describe('deleteAgent', () => {
        it('should return true when deleting agent', async () => {
            const result = await agentsService.deleteAgent('any-id')

            expect(result).toBe(true)
        })

        it('should simulate API delay', async () => {
            const startTime = Date.now()
            await agentsService.deleteAgent('any-id')
            const endTime = Date.now()

            expect(endTime - startTime).toBeGreaterThanOrEqual(500)
        })
    })

    describe('getWhatsAppLink', () => {
        it('should generate correct WhatsApp link for phone with spaces', () => {
            const phone = '+1 234 567 890'
            const link = agentsService.getWhatsAppLink(phone)

            expect(link).toBe('https://wa.me/1234567890')
        })

        it('should generate correct WhatsApp link for phone with plus sign', () => {
            const phone = '+1234567890'
            const link = agentsService.getWhatsAppLink(phone)

            expect(link).toBe('https://wa.me/1234567890')
        })

        it('should generate correct WhatsApp link for phone without plus sign', () => {
            const phone = '1234567890'
            const link = agentsService.getWhatsAppLink(phone)

            expect(link).toBe('https://wa.me/1234567890')
        })

        it('should handle phone with multiple spaces', () => {
            const phone = '+1  234  567  890'
            const link = agentsService.getWhatsAppLink(phone)

            expect(link).toBe('https://wa.me/1234567890')
        })
    })
}) 