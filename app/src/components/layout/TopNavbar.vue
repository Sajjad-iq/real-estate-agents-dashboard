<template>
  <div class="top-navbar">
    <!-- Left side - Back arrow and title (if needed) -->
    <div class="navbar-left">
    <div class="sidebar-header">
      <div class="logo">
        B
      </div>
      <h1 class="sidebar-title">Baity</h1>
    </div>
    </div>

    <!-- Right side - Language toggle and user profile -->
    <div class="navbar-right">
      <!-- Language Toggle -->
      <div class="language-toggle">
        <button 
          @click="setLanguage('en')"
          :class="['lang-button', { 'active': currentLanguage === 'en' }]"
        >
          En
        </button>
        <button 
          @click="setLanguage('ar')"
          :class="['lang-button', { 'active': currentLanguage === 'ar' }]"
        >
          Ar
        </button>
      </div>

      <!-- User Profile -->
      <div class="user-profile">
        <div class="user-avatar">
          <User class="user-icon" />
        </div>
        <span class="user-name">Admin</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowLeft, User } from 'lucide-vue-next'

interface Props {
  showBackButton?: boolean
  pageTitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  showBackButton: false,
  pageTitle: ''
})

const emit = defineEmits<{
  goBack: []
  languageChange: [language: string]
}>()

const { locale } = useI18n()
const currentLanguage = computed(() => locale.value)

function setLanguage(language: string) {
  locale.value = language
  emit('languageChange', language)
}

function goBack() {
  emit('goBack')
}
</script>

<style scoped>
.top-navbar {
  background-color: #1e293b;
  color: white;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-bottom: 1px solid #334155;
  z-index: 40;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-button {
  background: none;
  border: none;
  color: #cbd5e1;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s ease;
}

.back-button:hover {
  color: white;
}

.back-icon {
  width: 20px;
  height: 20px;
}

.page-title {
  font-size: 18px;
  font-weight: 500;
  margin: 0;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.language-toggle {
  display: flex;
  align-items: center;
  background-color: #374151;
  border-radius: 20px;
  padding: 4px;
}

.lang-button {
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  background: none;
  color: #cbd5e1;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lang-button:hover {
  color: white;
}

.lang-button.active {
  background-color: #3b82f6;
  color: white;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  background-color: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-icon {
  width: 16px;
  height: 16px;
}

.user-name {
  font-size: 14px;
  color: #cbd5e1;
}


.sidebar-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.logo {
  width: 32px;
  height: 32px;
  background-color: #3b82f6;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid #334155;
}
</style> 