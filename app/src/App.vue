<template>
  <Layout 
    :currentView="currentView"
    :pageTitle="pageTitle"
    :showBackButton="currentView === 'profile'"
    @navigate="handleNavigation"
    @goBack="handleGoBack"
    @languageChange="handleLanguageChange"
  >
    <AgentProfile v-if="currentView === 'profile'" />
    <AgentsPage v-else />
  </Layout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import AgentsPage from '@/pages/agents/AgentsPage.vue'
import AgentProfile from '@/pages/agents/AgentProfile.vue'
import Layout from '@/components/layout/Layout.vue'

const currentView = ref<'dashboard' | 'profile'>('dashboard')
const currentLanguage = ref('en')

// Dynamic page title
const pageTitle = computed(() => {
  if (currentView.value === 'profile') {
    return 'Agency Profile'
  }
  return '' // No title for dashboard as it's handled by the page itself
})

onMounted(() => {
  // Simple routing based on URL path
  const path = window.location.pathname
  if (path.startsWith('/agent/')) {
    currentView.value = 'profile'
  } else {
    currentView.value = 'dashboard'
  }
})

// Listen for popstate to handle back/forward navigation
window.addEventListener('popstate', () => {
  const path = window.location.pathname
  if (path.startsWith('/agent/')) {
    currentView.value = 'profile'
  } else {
    currentView.value = 'dashboard'
  }
})

function handleNavigation(section: string) {
  console.log('Navigate to:', section)
  // Handle navigation between different sections
  if (section === 'agencies') {
    currentView.value = 'dashboard'
    window.history.pushState({}, '', '/')
  }
  // Add more navigation handling as needed
}

function handleGoBack() {
  window.history.back()
}

function handleLanguageChange(language: string) {
  currentLanguage.value = language
  console.log('Language changed to:', language)
  // Implement language switching logic here
}
</script>

<style scoped>
</style>
