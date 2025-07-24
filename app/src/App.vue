

<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <AgentProfile v-if="currentView === 'profile'" />
    <AgentsPage v-else />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AgentsPage from '@/pages/agents/AgentsPage.vue'
import AgentProfile from '@/pages/agents/AgentProfile.vue'

const currentView = ref<'dashboard' | 'profile'>('dashboard')

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
</script>

<style scoped>
</style>
