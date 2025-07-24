import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PropertyStatusBadge from '../../../components/properties/PropertyStatusBadge.vue'
import '../../../__tests__/setup'

// Mock the Badge component
vi.mock('../../../components/ui/badge', () => ({
    Badge: {
        name: 'Badge',
        template: '<span :class="$attrs.class"><slot /></span>',
        props: ['variant']
    }
}))

// Mock useI18n
const mockT = vi.fn((key: string) => key)
vi.mock('vue-i18n', () => ({
    useI18n: () => ({
        t: mockT
    })
}))

describe('PropertyStatusBadge', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('rendering', () => {
        it('should render available status correctly', () => {
            const wrapper = mount(PropertyStatusBadge, {
                props: { status: 'available' }
            })

            expect(wrapper.exists()).toBe(true)
            expect(mockT).toHaveBeenCalledWith('properties.statuses.available')
        })

        it('should render sold status correctly', () => {
            const wrapper = mount(PropertyStatusBadge, {
                props: { status: 'sold' }
            })

            expect(wrapper.exists()).toBe(true)
            expect(mockT).toHaveBeenCalledWith('properties.statuses.sold')
        })

        it('should render rented status correctly', () => {
            const wrapper = mount(PropertyStatusBadge, {
                props: { status: 'rented' }
            })

            expect(wrapper.exists()).toBe(true)
            expect(mockT).toHaveBeenCalledWith('properties.statuses.rented')
        })

        it('should render pending status correctly', () => {
            const wrapper = mount(PropertyStatusBadge, {
                props: { status: 'pending' }
            })

            expect(wrapper.exists()).toBe(true)
            expect(mockT).toHaveBeenCalledWith('properties.statuses.pending')
        })
    })

    describe('text content', () => {
        it('should display translated text', () => {
            mockT.mockReturnValue('Available Property')

            const wrapper = mount(PropertyStatusBadge, {
                props: { status: 'available' }
            })

            expect(wrapper.text()).toBe('Available Property')
        })

        it('should call translation function with correct key', () => {
            mount(PropertyStatusBadge, {
                props: { status: 'sold' }
            })

            expect(mockT).toHaveBeenCalledWith('properties.statuses.sold')
        })
    })
}) 