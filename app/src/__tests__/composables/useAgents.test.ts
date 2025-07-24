import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAgents } from '../../composables/useAgents'
import { agentsService } from '../../services/agentsService'
import { testAgents, getTestAgent, getTestAgentsByStatus } from '../helpers/mockData'
import type { AgentFilters, SortState } from '../../types/agent'

// Mock the agents service
vi.mock('../../services/agentsService', () => ({
    agentsService: {
        getAgents: vi.fn(),
    }
}))

const mockAgentsService = vi.mocked(agentsService)

describe('useAgents', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        mockAgentsService.getAgents.mockResolvedValue(testAgents)
    })

    describe('initial state', () => {
        it('should initialize with empty state', () => {
            const { agents, loading, error, filters, sortState } = useAgents()

            expect(agents.value).toEqual([])
            expect(loading.value).toBe(false)
            expect(error.value).toBe(null)
            expect(filters.value).toEqual({})
            expect(sortState.value).toEqual({ column: null, direction: 'asc' })
        })
    })

    describe('loadAgents', () => {
        it('should load agents successfully', async () => {
            const { agents, loading, error, loadAgents } = useAgents()

            const loadPromise = loadAgents()
            expect(loading.value).toBe(true)

            await loadPromise

            expect(loading.value).toBe(false)
            expect(error.value).toBe(null)
            expect(agents.value).toEqual(testAgents)
            expect(mockAgentsService.getAgents).toHaveBeenCalledTimes(1)
        })

        it('should handle loading error', async () => {
            const errorMessage = 'Failed to load agents'
            mockAgentsService.getAgents.mockRejectedValue(new Error(errorMessage))

            const { agents, loading, error, loadAgents } = useAgents()

            await loadAgents()

            expect(loading.value).toBe(false)
            expect(error.value).toBe(errorMessage)
            expect(agents.value).toEqual([])
        })

        it('should handle non-Error exceptions', async () => {
            mockAgentsService.getAgents.mockRejectedValue('String error')

            const { loading, error, loadAgents } = useAgents()

            await loadAgents()

            expect(loading.value).toBe(false)
            expect(error.value).toBe('Failed to load agents')
        })
    })

    describe('filteredAgents', () => {
        it('should return all agents when no filters applied', async () => {
            const { filteredAgents, loadAgents } = useAgents()

            await loadAgents()

            expect(filteredAgents.value).toEqual(testAgents)
        })

        it('should filter by status', async () => {
            const { filteredAgents, loadAgents, updateFilters } = useAgents()

            await loadAgents()
            updateFilters({ status: 'active' })

            const activeAgents = getTestAgentsByStatus('active')
            expect(filteredAgents.value).toEqual(activeAgents)
        })

        it('should show all agents when status is "all"', async () => {
            const { filteredAgents, loadAgents, updateFilters } = useAgents()

            await loadAgents()
            updateFilters({ status: 'all' })

            expect(filteredAgents.value).toEqual(testAgents)
        })

        it('should filter by search term (name)', async () => {
            const { filteredAgents, loadAgents, updateFilters } = useAgents()

            await loadAgents()
            const testAgent = getTestAgent()
            updateFilters({ search: testAgent.name.substring(0, 3) })

            const filtered = filteredAgents.value
            expect(filtered.length).toBeGreaterThan(0)
            filtered.forEach(agent => {
                expect(agent.name.toLowerCase()).toContain(testAgent.name.substring(0, 3).toLowerCase())
            })
        })

        it('should filter by search term (phone)', async () => {
            const { filteredAgents, loadAgents, updateFilters } = useAgents()

            await loadAgents()
            const testAgent = getTestAgent()
            const phoneSearch = testAgent.phone.substring(0, 5)
            updateFilters({ search: phoneSearch })

            const filtered = filteredAgents.value
            expect(filtered.length).toBeGreaterThan(0)
            filtered.forEach(agent => {
                expect(agent.phone).toContain(phoneSearch)
            })
        })

        it('should filter by date range (from)', async () => {
            const { filteredAgents, loadAgents, updateFilters } = useAgents()

            await loadAgents()
            updateFilters({ dateFrom: '2023-06-01' })

            const filtered = filteredAgents.value
            filtered.forEach(agent => {
                expect(new Date(agent.joinDate).getTime()).toBeGreaterThanOrEqual(new Date('2023-06-01').getTime())
            })
        })

        it('should filter by date range (to)', async () => {
            const { filteredAgents, loadAgents, updateFilters } = useAgents()

            await loadAgents()
            updateFilters({ dateTo: '2023-06-01' })

            const filtered = filteredAgents.value
            filtered.forEach(agent => {
                expect(new Date(agent.joinDate).getTime()).toBeLessThanOrEqual(new Date('2023-06-01').getTime())
            })
        })

        it('should apply multiple filters simultaneously', async () => {
            const { filteredAgents, loadAgents, updateFilters } = useAgents()

            await loadAgents()
            updateFilters({
                status: 'active',
                dateFrom: '2023-01-01',
                dateTo: '2023-12-31'
            })

            const filtered = filteredAgents.value
            filtered.forEach(agent => {
                expect(agent.status).toBe('active')
                const joinDate = new Date(agent.joinDate)
                expect(joinDate.getTime()).toBeGreaterThanOrEqual(new Date('2023-01-01').getTime())
                expect(joinDate.getTime()).toBeLessThanOrEqual(new Date('2023-12-31').getTime())
            })
        })
    })

    describe('removeAgent', () => {
        it('should remove agent from the list', async () => {
            const { agents, loadAgents, removeAgent } = useAgents()

            await loadAgents()
            const initialCount = agents.value.length
            const agentToRemove = getTestAgent()

            removeAgent(agentToRemove.id)

            expect(agents.value.length).toBe(initialCount - 1)
            expect(agents.value.find(a => a.id === agentToRemove.id)).toBeUndefined()
        })

        it('should do nothing when removing non-existent agent', async () => {
            const { agents, loadAgents, removeAgent } = useAgents()

            await loadAgents()
            const initialCount = agents.value.length

            removeAgent('non-existent-id')

            expect(agents.value.length).toBe(initialCount)
        })
    })

    describe('updateFilters', () => {
        it('should update filters correctly', () => {
            const { filters, updateFilters } = useAgents()

            const newFilters: AgentFilters = {
                status: 'active',
                search: 'test',
                dateFrom: '2023-01-01',
                dateTo: '2023-12-31'
            }

            updateFilters(newFilters)

            expect(filters.value).toEqual(newFilters)
        })

        it('should replace filters on each update', () => {
            const { filters, updateFilters } = useAgents()

            updateFilters({ status: 'active' })
            updateFilters({ search: 'test' })

            // The updateFilters function replaces, not merges
            expect(filters.value).toEqual({
                search: 'test'
            })
        })
    })

    describe('updateSort', () => {
        it('should update sort state correctly', () => {
            const { sortState, updateSort } = useAgents()

            const newSort: SortState = {
                column: 'name',
                direction: 'desc'
            }

            updateSort(newSort)

            expect(sortState.value).toEqual(newSort)
        })
    })
}) 