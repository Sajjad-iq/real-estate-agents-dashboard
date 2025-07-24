import type { Property } from '@/types/property'

// Sample properties data
const sampleProperties: Property[] = [
    {
        id: 'p1',
        title: 'Modern Apartment in Downtown Baghdad',
        type: 'apartment',
        location: 'Karrada, Baghdad',
        price: 150000,
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        agentId: 'a1',
        description: 'Beautiful modern apartment with city views',
        features: ['Balcony', 'Parking', 'Elevator', 'Security'],
        yearBuilt: 2020,
        parking: 1,
        floor: 5,
        totalFloors: 10,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
    },
    {
        id: 'p2',
        title: 'Luxury Villa in Mansour',
        type: 'villa',
        location: 'Mansour, Baghdad',
        price: 450000,
        bedrooms: 5,
        bathrooms: 4,
        area: 350,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        agentId: 'a1',
        description: 'Spacious luxury villa with garden',
        features: ['Garden', 'Swimming Pool', 'Garage', 'Security System'],
        yearBuilt: 2019,
        parking: 3,
        createdAt: '2024-01-10T14:30:00Z',
        updatedAt: '2024-01-10T14:30:00Z'
    },
    {
        id: 'p3',
        title: 'Commercial Office Space',
        type: 'office',
        location: 'Jadiriyah, Baghdad',
        price: 200000,
        bedrooms: 0,
        bathrooms: 2,
        area: 180,
        status: 'rented',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        agentId: 'a1',
        description: 'Modern office space perfect for businesses',
        features: ['Conference Room', 'Reception', 'Parking', 'Air Conditioning'],
        yearBuilt: 2021,
        parking: 2,
        floor: 3,
        totalFloors: 8,
        createdAt: '2024-01-05T09:15:00Z',
        updatedAt: '2024-01-05T09:15:00Z'
    },
    {
        id: 'p4',
        title: 'Cozy Family House',
        type: 'house',
        location: 'Adhamiyah, Baghdad',
        price: 120000,
        bedrooms: 4,
        bathrooms: 3,
        area: 200,
        status: 'pending',
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        agentId: 'a2',
        description: 'Perfect family home in quiet neighborhood',
        features: ['Yard', 'Garage', 'Storage Room'],
        yearBuilt: 2015,
        parking: 2,
        createdAt: '2024-01-12T16:45:00Z',
        updatedAt: '2024-01-12T16:45:00Z'
    },
    {
        id: 'p5',
        title: 'Retail Shop in Market Area',
        type: 'shop',
        location: 'Shorja, Baghdad',
        price: 80000,
        bedrooms: 0,
        bathrooms: 1,
        area: 50,
        status: 'sold',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        agentId: 'a1',
        description: 'Prime location retail space',
        features: ['Street Facing', 'High Traffic Area'],
        yearBuilt: 2010,
        createdAt: '2024-01-08T11:20:00Z',
        updatedAt: '2024-01-08T11:20:00Z'
    }
]

class PropertiesService {
    async getPropertiesByAgent(agentId: string): Promise<Property[]> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))

        // Filter properties by agent ID
        const agentProperties = sampleProperties.filter(property => property.agentId === agentId)

        return agentProperties
    }

    async getPropertyById(propertyId: string): Promise<Property | null> {
        await new Promise(resolve => setTimeout(resolve, 200))

        const property = sampleProperties.find(p => p.id === propertyId)
        return property || null
    }

    async getAllProperties(): Promise<Property[]> {
        await new Promise(resolve => setTimeout(resolve, 300))
        return sampleProperties
    }

    async updateProperty(propertyId: string, updates: Partial<Property>): Promise<Property | null> {
        await new Promise(resolve => setTimeout(resolve, 500))

        const propertyIndex = sampleProperties.findIndex(p => p.id === propertyId)
        if (propertyIndex === -1) {
            return null
        }

        const updatedProperty = {
            ...sampleProperties[propertyIndex],
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