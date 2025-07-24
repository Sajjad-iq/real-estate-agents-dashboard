import './assets/main.css'

import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
import i18n from './i18n'
import router from './router'
import { queryClient } from './lib/queryClient'

// Initialize theme early to prevent flash
const savedTheme = localStorage.getItem('theme-preference') || 'light'
const isDark = savedTheme === 'dark'

if (isDark) {
    document.documentElement.classList.add('dark')
} else {
    document.documentElement.classList.remove('dark')
}

const app = createApp(App)

app.use(VueQueryPlugin, { queryClient })
app.use(i18n)
app.use(router)
app.mount('#app')
