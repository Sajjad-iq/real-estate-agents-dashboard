<template>
  <div class="sidebar-container">

    <nav class="sidebar-nav">
      <ul class="nav-list">
        <li>
          <button 
            @click="navigateTo('subcategories')"
            :class="['nav-item', { 'active': activeItem === 'subcategories' }]"
          >
            <Layers class="nav-icon" />
            <span>{{ $t('navigation.subcategories') }}</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('users')"
            :class="['nav-item', { 'active': activeItem === 'users' }]"
          >
            <User class="nav-icon" />
            <span>{{ $t('navigation.users') }}</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('realtors')"
            :class="['nav-item', { 'active': activeItem === 'realtors' }]"
          >
            <Building class="nav-icon" />
            <span>{{ $t('navigation.realtors') }}</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('engineering')"
            :class="['nav-item', { 'active': activeItem === 'engineering' }]"
          >
            <Wrench class="nav-icon" />
            <span>{{ $t('navigation.engineering') }}</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('buildings')"
            :class="['nav-item', { 'active': activeItem === 'buildings' }]"
          >
            <Home class="nav-icon" />
            <span>{{ $t('navigation.buildings') }}</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('agencies')"
            :class="['nav-item', { 'active': activeItem === 'agencies' }]"
          >
            <Briefcase class="nav-icon" />
            <span>{{ $t('navigation.agencies') }}</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('customers')"
            :class="['nav-item', { 'active': activeItem === 'customers' }]"
          >
            <Users class="nav-icon" />
            <span>{{ $t('navigation.customers') }}</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('realestates')"
            :class="['nav-item', { 'active': activeItem === 'realestates' }]"
          >
            <Home class="nav-icon" />
            <span>{{ $t('navigation.realestates') }}</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('projects')"
            :class="['nav-item', { 'active': activeItem === 'projects' }]"
          >
            <FileText class="nav-icon" />
            <span>{{ $t('navigation.projects') }}</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('news')"
            :class="['nav-item', { 'active': activeItem === 'news' }]"
          >
            <Newspaper class="nav-icon" />
            <span>{{ $t('navigation.news') }}</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('bundles')"
            :class="['nav-item', { 'active': activeItem === 'bundles' }]"
          >
            <Package class="nav-icon" />
            <span>{{ $t('navigation.bundles') }}</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('contact')"
            :class="['nav-item', { 'active': activeItem === 'contact' }]"
          >
            <Mail class="nav-icon" />
            <span>{{ $t('navigation.contact') }}</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('reports')"
            :class="['nav-item', { 'active': activeItem === 'reports' }]"
          >
            <BarChart3 class="nav-icon" />
            <span>{{ $t('navigation.reports') }}</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('stats')"
            :class="['nav-item', { 'active': activeItem === 'stats' }]"
          >
            <TrendingUp class="nav-icon" />
            <span>{{ $t('navigation.stats') }}</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('audit')"
            :class="['nav-item', { 'active': activeItem === 'audit' }]"
          >
            <FileCheck class="nav-icon" />
            <span>{{ $t('navigation.audit') }}</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('settings')"
            :class="['nav-item', { 'active': activeItem === 'settings' }]"
          >
            <Settings class="nav-icon" />
            <span>{{ $t('navigation.settings') }}</span>
          </button>
        </li>
      </ul>
    </nav>

    <!-- Theme Switcher -->
    <div class="theme-switcher">
      <div class="theme-title">
        <span>{{ $t('theme.appearance') }}</span>
      </div>
      <div class="theme-options">
        <button
          @click="setTheme('light')"
          :class="['theme-option', { 'active': theme === 'light' }]"
          :title="$t('theme.light')"
        >
          <Sun class="theme-icon" />
        </button>
        <button
          @click="setTheme('dark')"
          :class="['theme-option', { 'active': theme === 'dark' }]"
          :title="$t('theme.dark')"
        >
          <Moon class="theme-icon" />
        </button>
        <button
          @click="setTheme('system')"
          :class="['theme-option', { 'active': theme === 'system' }]"
          :title="$t('theme.system')"
        >
          <Monitor class="theme-icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import {
  Layers,
  User,
  Users,
  Building,
  Wrench,
  Home,
  Briefcase,
  FileText,
  Newspaper,
  Package,
  Mail,
  BarChart3,
  TrendingUp,
  FileCheck,
  Settings,
  Sun,
  Moon,
  Monitor
} from 'lucide-vue-next'

const emit = defineEmits<{
  navigate: [section: string]
}>()

const route = useRoute()
const router = useRouter()
const activeItem = ref('agencies') // Default to agencies since that's our main section

// Theme management
const { theme, setTheme } = useTheme()

// Update active item based on current route
const currentSection = computed(() => {
  if (route.path.includes('/agents')) {
    return 'agencies'
  }
  // Add more route mappings as needed
  return 'agencies' // Default fallback
})

onMounted(() => {
  activeItem.value = currentSection.value
})

function navigateTo(section: string) {
  activeItem.value = section
  emit('navigate', section)
  // Map section to route path
  let path = '/'
  switch (section) {
    case 'agencies':
      path = '/agents'
      break
    case 'users':
      path = '/users'
      break
    // Add other cases for each section...
    default:
      path = `/${section}`
  }
  router.push(path)
}
</script>

<style scoped>
.sidebar-container {
  width: 240px;
  min-width: 240px;
  height: 100%;
  background-color: #1e293b;
  color: white;
  display: flex;
  flex-direction: column;
}

/* RTL support is now handled globally via HTML dir attribute */

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid #334155;
}

[dir="rtl"] .sidebar-header {
  /* Keep flex-direction: row to maintain logo-first order */
  text-align: right;
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

.sidebar-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}


.sidebar-nav {
  flex: 1;
  overflow-y: auto;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 16px 0;
}

.nav-list li {
  margin: 0;
  padding: 0;
}

.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: none;
  background: none;
  color: #cbd5e1;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.nav-item:hover:not(.active) {
  background-color: #374151;
  color: white;
}

.nav-item.active {
  background-color: #f97316;
  color: white;
  border-radius: 0 25px 25px 0;
  margin-right: 12px;
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: #f97316;
}

/* RTL Support */
[dir="rtl"] .nav-item {
  text-align: right;
  /* Keep flex-direction: row to maintain icon-first order */
}

[dir="rtl"] .nav-item.active {
  border-radius: 25px 0 0 25px;
  margin-right: 0;
  margin-left: 12px;
}

[dir="rtl"] .nav-item.active::before {
  left: auto;
  right: 0;
}

.nav-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.nav-item span {
  flex: 1;
}

/* Theme Switcher */
.theme-switcher {
  padding: 1rem;
  border-top: 1px solid var(--sidebar-border);
  margin-top: auto;
}

.theme-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: color-mix(in srgb, var(--sidebar-foreground) 60%, transparent);
  margin-bottom: 0.75rem;
  text-align: center;
}

.theme-options {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.theme-option {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  border: 1px solid var(--sidebar-border);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: color-mix(in srgb, var(--sidebar-foreground) 70%, transparent);
}

.theme-option:hover {
  background-color: var(--sidebar-accent);
  border-color: var(--sidebar-accent);
  color: var(--sidebar-accent-foreground);
}

.theme-option.active {
  background-color: var(--sidebar-primary);
  border-color: var(--sidebar-primary);
  color: var(--sidebar-primary-foreground);
}

.theme-icon {
  width: 1rem;
  height: 1rem;
}

/* RTL Support for Theme Switcher */
[dir="rtl"] .theme-switcher {
  text-align: right;
}
</style> 