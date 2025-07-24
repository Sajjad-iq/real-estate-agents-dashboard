import { ref, watch, onMounted } from 'vue'

export type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'theme-preference'

export function useTheme() {
    const theme = ref<Theme>('light')
    const isDark = ref(false)

    // Initialize theme from localStorage or default to system
    function initTheme() {
        const stored = localStorage.getItem(STORAGE_KEY) as Theme || 'system'
        theme.value = stored
        updateDarkMode()
    }

    // Update dark mode based on theme preference
    function updateDarkMode() {
        if (theme.value === 'system') {
            isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
        } else {
            isDark.value = theme.value === 'dark'
        }

        // Update document class
        if (isDark.value) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    // Set theme preference
    function setTheme(newTheme: Theme) {
        theme.value = newTheme
        localStorage.setItem(STORAGE_KEY, newTheme)
        updateDarkMode()
    }

    // Toggle between light and dark (ignoring system)
    function toggleTheme() {
        if (theme.value === 'dark') {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }

    // Watch for system theme changes
    function watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        mediaQuery.addEventListener('change', () => {
            if (theme.value === 'system') {
                updateDarkMode()
            }
        })
    }

    // Watch theme changes
    watch(theme, updateDarkMode)

    onMounted(() => {
        initTheme()
        watchSystemTheme()
    })

    return {
        theme,
        isDark,
        setTheme,
        toggleTheme
    }
} 