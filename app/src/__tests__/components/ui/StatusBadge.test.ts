import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import StatusBadge from '../../../components/ui/StatusBadge.vue'
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

describe('StatusBadge', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('rendering', () => {
        it('should render active status correctly', () => {
            const wrapper = mount(StatusBadge, {
                props: { status: 'active' }
            })

            expect(wrapper.exists()).toBe(true)
            expect(mockT).toHaveBeenCalledWith('agencies.table.filters.active')
        })

        it('should render pending status correctly', () => {
            const wrapper = mount(StatusBadge, {
                props: { status: 'pending' }
            })

            expect(wrapper.exists()).toBe(true)
            expect(mockT).toHaveBeenCalledWith('agencies.table.filters.pending')
        })

        it('should render refused status correctly', () => {
            const wrapper = mount(StatusBadge, {
                props: { status: 'refused' }
            })

            expect(wrapper.exists()).toBe(true)
            expect(mockT).toHaveBeenCalledWith('agencies.table.filters.refused')
        })
    })

    describe('badge variant', () => {
        it('should use default variant for active status', () => {
            const wrapper = mount(StatusBadge, {
                props: { status: 'active' }
            })

            const badgeComponent = wrapper.findComponent({ name: 'Badge' })
            expect(badgeComponent.props('variant')).toBe('default')
        })

        it('should use secondary variant for pending status', () => {
            const wrapper = mount(StatusBadge, {
                props: { status: 'pending' }
            })

            const badgeComponent = wrapper.findComponent({ name: 'Badge' })
            expect(badgeComponent.props('variant')).toBe('secondary')
        })

        it('should use destructive variant for refused status', () => {
            const wrapper = mount(StatusBadge, {
                props: { status: 'refused' }
            })

            const badgeComponent = wrapper.findComponent({ name: 'Badge' })
            expect(badgeComponent.props('variant')).toBe('destructive')
        })
    })

    describe('badge classes', () => {
        it('should apply correct classes for active status', () => {
            const wrapper = mount(StatusBadge, {
                props: { status: 'active' }
            })

            const badgeElement = wrapper.find('span')
            expect(badgeElement.classes()).toContain('bg-teal-100')
            expect(badgeElement.classes()).toContain('text-teal-800')
            expect(badgeElement.classes()).toContain('hover:bg-teal-100')
            expect(badgeElement.classes()).toContain('border-teal-200')
        })

        it('should apply correct classes for pending status', () => {
            const wrapper = mount(StatusBadge, {
                props: { status: 'pending' }
            })

            const badgeElement = wrapper.find('span')
            expect(badgeElement.classes()).toContain('bg-amber-100')
            expect(badgeElement.classes()).toContain('text-amber-800')
            expect(badgeElement.classes()).toContain('hover:bg-amber-100')
            expect(badgeElement.classes()).toContain('border-amber-200')
        })

        it('should apply correct classes for refused status', () => {
            const wrapper = mount(StatusBadge, {
                props: { status: 'refused' }
            })

            const badgeElement = wrapper.find('span')
            expect(badgeElement.classes()).toContain('bg-rose-100')
            expect(badgeElement.classes()).toContain('text-rose-800')
            expect(badgeElement.classes()).toContain('hover:bg-rose-100')
            expect(badgeElement.classes()).toContain('border-rose-200')
        })
    })

    describe('text content', () => {
        it('should display translated text', () => {
            mockT.mockReturnValue('Active Status')

            const wrapper = mount(StatusBadge, {
                props: { status: 'active' }
            })

            expect(wrapper.text()).toBe('Active Status')
        })

        it('should call translation function with correct key', () => {
            mount(StatusBadge, {
                props: { status: 'pending' }
            })

            expect(mockT).toHaveBeenCalledWith('agencies.table.filters.pending')
        })
    })
}) 