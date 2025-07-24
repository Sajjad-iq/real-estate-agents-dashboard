import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

export function useRTL() {
    const { locale } = useI18n()

    // Update HTML dir attribute when locale changes
    const updateDirection = (newLocale: string) => {
        const htmlElement = document.documentElement
        if (newLocale === 'ar') {
            htmlElement.setAttribute('dir', 'rtl')
            htmlElement.setAttribute('lang', 'ar')
        } else {
            htmlElement.setAttribute('dir', 'ltr')
            htmlElement.setAttribute('lang', 'en')
        }
    }

    // Set initial direction
    updateDirection(locale.value)

    // Watch for locale changes
    watch(locale, (newLocale) => {
        updateDirection(newLocale)
    })

    return {
        updateDirection
    }
} 