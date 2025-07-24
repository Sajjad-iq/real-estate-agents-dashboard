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

// Get values from route meta - this is the proper Vue Router way
const currentView = computed(() => (route.meta.currentView as string) || 'dashboard')
const pageTitle = computed(() => (route.meta.title as string) || '')
const showBackButton = computed(() => (route.meta.showBackButton as boolean) || false)

function handleNavigation(section: string) {
  // Use named routes for navigation - this is the standard approach
  switch (section) {
    case 'subcategories':
      router.push({ name: 'subcategories' })
      break
    case 'users':
      router.push({ name: 'users' })
      break
    case 'realtors':
      router.push({ name: 'realtors' })
      break
    case 'engineering':
      router.push({ name: 'engineering' })
      break
    case 'buildings':
      router.push({ name: 'buildings' })
      break
    case 'agencies':
    case 'agents':
      router.push({ name: 'agents' })
      break
    case 'customers':
      router.push({ name: 'customers' })
      break
    case 'realestates':
      router.push({ name: 'realestates' })
      break
    case 'projects':
      router.push({ name: 'projects' })
      break
    case 'news':
      router.push({ name: 'news' })
      break
    case 'bundles':
      router.push({ name: 'bundles' })
      break
    case 'contact':
      router.push({ name: 'contact' })
      break
    case 'reports':
      router.push({ name: 'reports' })
      break
    case 'stats':
      router.push({ name: 'stats' })
      break
    case 'audit':
      router.push({ name: 'audit' })
      break
    case 'settings':
      router.push({ name: 'settings' })
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
  // Language switching is handled by the i18n composable
}
</script>

<style scoped>
</style>
