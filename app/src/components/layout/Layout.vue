<template>
  <div id="layout" class="h-screen overflow-hidden grid  grid-rows-[auto_1fr]">
    <!-- Sidebar Navigation -->
    <TopNavbar 
        :showBackButton="showBackButton" 
        :pageTitle="pageTitle"
        @goBack="handleGoBack"
        @languageChange="handleLanguageChange"
      />
    <!-- Main Content Area -->
    <div :class="['grid grid-cols-[240px_1fr]']">
      <!-- Top Navigation -->
      <Sidebar 
        @navigate="handleNavigation" 
      />  
      <!-- Page Content Slot -->
      <main class="flex-1 h-full overflow-scroll">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import TopNavbar from './TopNavbar.vue'

interface Props {
  currentView?: 'dashboard' | 'profile'
  pageTitle?: string
  showBackButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  currentView: 'dashboard',
  pageTitle: '',
  showBackButton: false
})

const emit = defineEmits<{
  navigate: [section: string]
  goBack: []
  languageChange: [language: string]
}>()

// Show sidebar for dashboard view, hide for profile view

function handleNavigation(section: string) {
  emit('navigate', section)
}

function handleGoBack() {
  emit('goBack')
}

function handleLanguageChange(language: string) {
  emit('languageChange', language)
}
</script>

