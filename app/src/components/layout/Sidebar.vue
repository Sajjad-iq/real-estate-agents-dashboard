<template>
  <div class="sidebar-container">
    <!-- Navigation Menu -->
    <nav class="sidebar-nav">
      <ul class="nav-list">
        <li>
          <button 
            @click="navigateTo('subcategories')"
            :class="['nav-item', { 'active': activeItem === 'subcategories' }]"
          >
            <Layers class="nav-icon" />
            <span>Sub Categories</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('users')"
            :class="['nav-item', { 'active': activeItem === 'users' }]"
          >
            <User class="nav-icon" />
            <span>Users</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('realtors')"
            :class="['nav-item', { 'active': activeItem === 'realtors' }]"
          >
            <Building class="nav-icon" />
            <span>Realtors</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('engineering')"
            :class="['nav-item', { 'active': activeItem === 'engineering' }]"
          >
            <Wrench class="nav-icon" />
            <span>Engineering Companies</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('buildings')"
            :class="['nav-item', { 'active': activeItem === 'buildings' }]"
          >
            <Home class="nav-icon" />
            <span>Building Complexes</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('agencies')"
            :class="['nav-item', { 'active': activeItem === 'agencies' }]"
          >
            <Briefcase class="nav-icon" />
            <span>Realestate Agencies</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('customers')"
            :class="['nav-item', { 'active': activeItem === 'customers' }]"
          >
            <Users class="nav-icon" />
            <span>Customers</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('realestates')"
            :class="['nav-item', { 'active': activeItem === 'realestates' }]"
          >
            <Home class="nav-icon" />
            <span>Realestates</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('projects')"
            :class="['nav-item', { 'active': activeItem === 'projects' }]"
          >
            <FileText class="nav-icon" />
            <span>Projects</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('news')"
            :class="['nav-item', { 'active': activeItem === 'news' }]"
          >
            <Newspaper class="nav-icon" />
            <span>News</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('bundles')"
            :class="['nav-item', { 'active': activeItem === 'bundles' }]"
          >
            <Package class="nav-icon" />
            <span>Bundles</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('contact')"
            :class="['nav-item', { 'active': activeItem === 'contact' }]"
          >
            <Mail class="nav-icon" />
            <span>Contact</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('reports')"
            :class="['nav-item', { 'active': activeItem === 'reports' }]"
          >
            <BarChart3 class="nav-icon" />
            <span>Reports</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('stats')"
            :class="['nav-item', { 'active': activeItem === 'stats' }]"
          >
            <TrendingUp class="nav-icon" />
            <span>Stats</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('audit')"
            :class="['nav-item', { 'active': activeItem === 'audit' }]"
          >
            <FileCheck class="nav-icon" />
            <span>Action Audit</span>
          </button>
        </li>

        <li>
          <button 
            @click="navigateTo('settings')"
            :class="['nav-item', { 'active': activeItem === 'settings' }]"
          >
            <Settings class="nav-icon" />
            <span>Settings</span>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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
  Settings
} from 'lucide-vue-next'

const emit = defineEmits<{
  navigate: [section: string]
}>()

const activeItem = ref('agencies') // Default to agencies since that's our main section

function navigateTo(section: string) {
  activeItem.value = section
  emit('navigate', section)
}

// Set agencies as active by default for our real estate dashboard
if (window.location.pathname === '/' || window.location.pathname.includes('agent')) {
  activeItem.value = 'agencies'
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

.nav-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.nav-item span {
  flex: 1;
}
</style> 