export interface Property {
    id: string
    title: string
    type: 'apartment' | 'house' | 'villa' | 'office' | 'shop' | 'land'
    location: string
    price: number
    bedrooms: number
    bathrooms: number
    area: number
    status: 'available' | 'sold' | 'rented' | 'pending'
    image: string
    agentId: string
    description?: string
    features?: string[]
    yearBuilt?: number
    parking?: number
    floor?: number
    totalFloors?: number
    createdAt: string
    updatedAt: string
} 