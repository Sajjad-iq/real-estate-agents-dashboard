import { describe, it, expect, vi, beforeEach } from 'vitest'
import { propertiesService } from '../../services/propertiesService'

// Mock the properties data import - mock data must be inside the factory function
vi.mock('../../assets/data/properties.json', () => ({
    default: [
        {
            id: 'test-property-1',
            title: 'Test Property 1',
            type: 'apartment',
            location: 'Test Location 1',
            price: 250000,
            bedrooms: 2,
            bathrooms: 2,
            area: 1200,
            status: 'available',
            image: '/test-image1.jpg',
            agentId: 'test-agent-1',
            description: 'Test description',
            features: ['parking', 'balcony'],
            yearBuilt: 2020,
            parking: 1,
            floor: 5,
            totalFloors: 10,
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z'
        },
        {
            id: 'test-property-2',
            title: 'Test Property 2',
            type: 'house',
            location: 'Test Location 2',
            price: 450000,
            bedrooms: 4,
            bathrooms: 3,
            area: 2500,
            status: 'sold',
            image: '/test-image2.jpg',
            agentId: 'test-agent-1',
            description: 'Test house description',
            features: ['garden', 'garage'],
            yearBuilt: 2018,
            parking: 2,
            createdAt: '2023-02-01T00:00:00Z',
            updatedAt: '2023-02-01T00:00:00Z'
        }
    ]
}))

// Define mock data for use in tests (same as above but accessible in test context)
const mockProperties = [
    {
        id: 'test-property-1',
        title: 'Test Property 1',
        type: 'apartment' as const,
        location: 'Test Location 1',
        price: 250000,
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        status: 'available' as const,
        image: '/test-image1.jpg',
        agentId: 'test-agent-1',
        description: 'Test description',
        features: ['parking', 'balcony'],
        yearBuilt: 2020,
        parking: 1,
        floor: 5,
        totalFloors: 10,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z'
    },
    {
        id: 'test-property-2',
        title: 'Test Property 2',
        type: 'house' as const,
        location: 'Test Location 2',
        price: 450000,
        bedrooms: 4,
        bathrooms: 3,
        area: 2500,
        status: 'sold' as const,
        image: '/test-image2.jpg',
        agentId: 'test-agent-1',
        description: 'Test house description',
        features: ['garden', 'garage'],
        yearBuilt: 2018,
        parking: 2,
        createdAt: '2023-02-01T00:00:00Z',
        updatedAt: '2023-02-01T00:00:00Z'
    }
]

describe('PropertiesService', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('getAllProperties', () => {
        it('should return all properties after simulated delay', async () => {
            const startTime = Date.now()
            const properties = await propertiesService.getAllProperties()
            const endTime = Date.now()

            expect(properties).toEqual(mockProperties)
            expect(properties.length).toBeGreaterThan(0)
            expect(endTime - startTime).toBeGreaterThanOrEqual(300)
        })

        it('should return properties with correct structure', async () => {
            const properties = await propertiesService.getAllProperties()
            const firstProperty = properties[0]

            expect(firstProperty).toHaveProperty('id')
            expect(firstProperty).toHaveProperty('title')
            expect(firstProperty).toHaveProperty('type')
            expect(firstProperty).toHaveProperty('location')
            expect(firstProperty).toHaveProperty('price')
            expect(firstProperty).toHaveProperty('bedrooms')
            expect(firstProperty).toHaveProperty('bathrooms')
            expect(firstProperty).toHaveProperty('area')
            expect(firstProperty).toHaveProperty('status')
            expect(firstProperty).toHaveProperty('agentId')
        })
    })

    describe('getPropertyById', () => {
        it('should return property when valid ID is provided', async () => {
            const testProperty = mockProperties[0]
            const property = await propertiesService.getPropertyById(testProperty.id)

            expect(property).toEqual(testProperty)
        })

        it('should return null when invalid ID is provided', async () => {
            const property = await propertiesService.getPropertyById('non-existent-id')

            expect(property).toBeNull()
        })

        it('should simulate API delay', async () => {
            const startTime = Date.now()
            await propertiesService.getPropertyById(mockProperties[0].id)
            const endTime = Date.now()

            expect(endTime - startTime).toBeGreaterThanOrEqual(200)
        })
    })

    describe('getPropertiesByAgent', () => {
        it('should return properties for valid agent ID', async () => {
            const agentId = 'test-agent-1'
            const properties = await propertiesService.getPropertiesByAgent(agentId)

            expect(Array.isArray(properties)).toBe(true)
            properties.forEach(property => {
                expect(property.agentId).toBe(agentId)
            })
        })

        it('should return empty array for agent with no properties', async () => {
            const properties = await propertiesService.getPropertiesByAgent('non-existent-agent')

            expect(properties).toEqual([])
        })

        it('should simulate API delay', async () => {
            const startTime = Date.now()
            await propertiesService.getPropertiesByAgent('test-agent-1')
            const endTime = Date.now()

            expect(endTime - startTime).toBeGreaterThanOrEqual(300)
        })
    })

    describe('updateProperty', () => {
        it('should update property and return updated data', async () => {
            const testProperty = mockProperties[0]
            const updates = {
                title: 'Updated Property Title',
                price: 999999,
                status: 'sold' as const
            }

            const updatedProperty = await propertiesService.updateProperty(testProperty.id, updates)

            expect(updatedProperty).toBeTruthy()
            expect(updatedProperty?.id).toBe(testProperty.id)
            expect(updatedProperty?.title).toBe(updates.title)
            expect(updatedProperty?.price).toBe(updates.price)
            expect(updatedProperty?.status).toBe(updates.status)
            expect(updatedProperty?.location).toBe(testProperty.location) // unchanged field
            expect(updatedProperty?.updatedAt).toBeDefined()
        })

        it('should return null when updating non-existent property', async () => {
            const updates = { title: 'Updated Title' }

            const result = await propertiesService.updateProperty('non-existent-id', updates)

            expect(result).toBeNull()
        })

        it('should preserve property ID even if provided in updates', async () => {
            const testProperty = mockProperties[0]
            const updates = { id: 'different-id', title: 'Updated Title' }

            const updatedProperty = await propertiesService.updateProperty(testProperty.id, updates)

            expect(updatedProperty?.id).toBe(testProperty.id)
            expect(updatedProperty?.title).toBe(updates.title)
        })

        it('should update the updatedAt timestamp', async () => {
            const testProperty = mockProperties[0]
            const originalUpdatedAt = testProperty.updatedAt

            // Wait a bit to ensure timestamp difference
            await new Promise(resolve => setTimeout(resolve, 10))

            const updatedProperty = await propertiesService.updateProperty(testProperty.id, { title: 'New Title' })

            expect(updatedProperty?.updatedAt).not.toBe(originalUpdatedAt)
            expect(new Date(updatedProperty?.updatedAt || '').getTime()).toBeGreaterThan(new Date(originalUpdatedAt).getTime())
        })

        it('should simulate API delay', async () => {
            const testProperty = mockProperties[0]
            const startTime = Date.now()
            await propertiesService.updateProperty(testProperty.id, { title: 'Test' })
            const endTime = Date.now()

            expect(endTime - startTime).toBeGreaterThanOrEqual(500)
        })
    })

    describe('deleteProperty', () => {
        it('should return true when deleting property', async () => {
            const result = await propertiesService.deleteProperty('any-id')

            expect(result).toBe(true)
        })

        it('should simulate API delay', async () => {
            const startTime = Date.now()
            await propertiesService.deleteProperty('any-id')
            const endTime = Date.now()

            expect(endTime - startTime).toBeGreaterThanOrEqual(500)
        })
    })
}) 