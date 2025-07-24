<template>
  <div id="layout" class="layout-container">
    <!-- Top Navigation -->
    <TopNavbar 
      :pageTitle="pageTitle"
      @goBack="handleGoBack"
      @languageChange="handleLanguageChange"
      class="layout-navbar"
    />
    
    <!-- Main Content Area -->
    <div class="layout-main">
      <!-- Sidebar Navigation -->
      <Sidebar 
        @navigate="handleNavigation" 
        class="layout-sidebar"
      />  
      
      <!-- Page Content Slot -->
      <main class="layout-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import TopNavbar from './TopNavbar.vue'

interface Props {
  currentView?: 'dashboard' | 'profile' | 'properties'
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

<style scoped>
.layout-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.layout-navbar {
  flex-shrink: 0;
}

.layout-main {
  flex: 1;
  display: flex;
  min-height: 0;
}

.layout-sidebar {
  flex-shrink: 0;
  width: 240px;
}

.layout-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
