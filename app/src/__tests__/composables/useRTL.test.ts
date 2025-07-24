import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useRTL } from '../../composables/useRTL'
import { createI18n } from 'vue-i18n'
import { ref } from 'vue'

// Mock useI18n
const mockLocale = ref('en')
vi.mock('vue-i18n', () => ({
    useI18n: () => ({
        locale: mockLocale
    })
}))

// Mock document.documentElement
const mockSetAttribute = vi.fn()
const mockDocumentElement = {
    setAttribute: mockSetAttribute
}

Object.defineProperty(document, 'documentElement', {
    value: mockDocumentElement,
    writable: true
})

describe('useRTL', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        mockLocale.value = 'en'
    })

    afterEach(() => {
        mockSetAttribute.mockClear()
    })

    describe('initialization', () => {
        it('should set LTR direction for English locale', () => {
            mockLocale.value = 'en'

            useRTL()

            expect(mockSetAttribute).toHaveBeenCalledWith('dir', 'ltr')
            expect(mockSetAttribute).toHaveBeenCalledWith('lang', 'en')
        })

        it('should set RTL direction for Arabic locale', () => {
            mockLocale.value = 'ar'

            useRTL()

            expect(mockSetAttribute).toHaveBeenCalledWith('dir', 'rtl')
            expect(mockSetAttribute).toHaveBeenCalledWith('lang', 'ar')
        })
    })

    describe('locale changes', () => {
        it('should update direction when locale changes from en to ar', async () => {
            mockLocale.value = 'en'
            useRTL()

            // Clear initial calls
            mockSetAttribute.mockClear()

            // Change locale to Arabic
            mockLocale.value = 'ar'

            // Wait for reactivity
            await new Promise(resolve => setTimeout(resolve, 0))

            expect(mockSetAttribute).toHaveBeenCalledWith('dir', 'rtl')
            expect(mockSetAttribute).toHaveBeenCalledWith('lang', 'ar')
        })

        it('should update direction when locale changes from ar to en', async () => {
            mockLocale.value = 'ar'
            useRTL()

            // Clear initial calls
            mockSetAttribute.mockClear()

            // Change locale to English
            mockLocale.value = 'en'

            // Wait for reactivity
            await new Promise(resolve => setTimeout(resolve, 0))

            expect(mockSetAttribute).toHaveBeenCalledWith('dir', 'ltr')
            expect(mockSetAttribute).toHaveBeenCalledWith('lang', 'en')
        })
    })

    describe('updateDirection function', () => {
        it('should return updateDirection function', () => {
            const { updateDirection } = useRTL()

            expect(updateDirection).toBeTypeOf('function')
        })

        it('should manually update direction to RTL for Arabic', () => {
            const { updateDirection } = useRTL()

            mockSetAttribute.mockClear()
            updateDirection('ar')

            expect(mockSetAttribute).toHaveBeenCalledWith('dir', 'rtl')
            expect(mockSetAttribute).toHaveBeenCalledWith('lang', 'ar')
        })

        it('should manually update direction to LTR for English', () => {
            const { updateDirection } = useRTL()

            mockSetAttribute.mockClear()
            updateDirection('en')

            expect(mockSetAttribute).toHaveBeenCalledWith('dir', 'ltr')
            expect(mockSetAttribute).toHaveBeenCalledWith('lang', 'en')
        })

        it('should treat non-Arabic locales as LTR', () => {
            const { updateDirection } = useRTL()

            mockSetAttribute.mockClear()
            updateDirection('fr')

            expect(mockSetAttribute).toHaveBeenCalledWith('dir', 'ltr')
            expect(mockSetAttribute).toHaveBeenCalledWith('lang', 'en')
        })
    })
}) 