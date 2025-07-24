import propertiesData from '@/assets/data/properties.json'
import type { Property } from '@/types/property'

class PropertiesService {
    async getPropertiesByAgent(agentId: string): Promise<Property[]> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))

        // Filter properties by agent ID
        const agentProperties = (propertiesData as Property[]).filter((property: Property) => property.agentId === agentId)

        return agentProperties
    }

    async getPropertyById(propertyId: string): Promise<Property | null> {
        await new Promise(resolve => setTimeout(resolve, 200))

        const property = (propertiesData as Property[]).find((p: Property) => p.id === propertyId)
        return property || null
    }

    async getAllProperties(): Promise<Property[]> {
        await new Promise(resolve => setTimeout(resolve, 300))
        return propertiesData as Property[]
    }

    async updateProperty(propertyId: string, updates: Partial<Property>): Promise<Property | null> {
        await new Promise(resolve => setTimeout(resolve, 500))

        const propertyIndex = (propertiesData as Property[]).findIndex((p: Property) => p.id === propertyId)
        if (propertyIndex === -1) {
            return null
        }

        const updatedProperty = {
            ...(propertiesData as Property[])[propertyIndex],
            ...updates,
            id: propertyId,
            updatedAt: new Date().toISOString()
        }

        console.log(`Updating property with id: ${propertyId}`, updates)
        return updatedProperty
    }

    async deleteProperty(propertyId: string): Promise<boolean> {
        await new Promise(resolve => setTimeout(resolve, 500))

        console.log(`Deleting property with id: ${propertyId}`)
        return true
    }
}

export const propertiesService = new PropertiesService() 