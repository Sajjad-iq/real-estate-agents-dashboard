<template>
  <Layout 
    :currentView="currentView"
    :pageTitle="pageTitle"
    :showBackButton="showBackButton"
    @navigate="handleNavigation"
    @goBack="handleGoBack"
    @languageChange="handleLanguageChange"
  >
    <router-view />
  </Layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Layout from '@/components/layout/Layout.vue'
import { useRTL } from '@/composables/useRTL'

const route = useRoute()
const router = useRouter()

// Initialize RTL support
useRTL()

// Dynamic view based on route
const currentView = computed(() => {
  if (route.path.includes('/agents/') && route.path.includes('/properties')) {
    return 'properties'
  } else if (route.path.includes('/agents/') && route.params.agentId) {
    return 'profile'
  }
  return 'dashboard'
})

// Dynamic page title
const pageTitle = computed(() => {
  switch (currentView.value) {
    case 'profile':
      return 'Agency Profile'
    case 'properties':
      return 'Agent Properties'
    default:
      return '' // No title for dashboard as it's handled by the page itself
  }
})

// Show back button for detail pages
const showBackButton = computed(() => {
  return currentView.value === 'profile' || currentView.value === 'properties'
})

function handleNavigation(section: string) {
  console.log('Navigate to:', section)
  // Handle navigation between different sections
  switch (section) {
    case 'agencies':
    case 'agents':
      router.push({ name: 'agents' })
      break
    case 'dashboard':
      router.push({ name: 'agents' })
      break
    default:
      console.warn('Unknown navigation section:', section)
  }
}

function handleGoBack() {
  router.go(-1)
}

function handleLanguageChange(language: string) {
  console.log('Language changed to:', language)
  // Implement language switching logic here
}
</script>

<style scoped>
</style>
