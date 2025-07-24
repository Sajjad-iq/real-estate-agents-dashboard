<template>
  <div class="custom-container py-5 grid grid-cols-10 gap-5">
    <!-- Main Content (7 columns) -->
    <div class="col-span-7 rounded-xl p-5 bg-surfaceContainerLow">
      <!-- Gallery Section -->
      <div id="Gallery">
        <!-- Header with Back Button -->
        <div class="flex items-center justify-between">
          <button @click="goBack" class="flex items-center gap-1">
            <ArrowLeft class="w-5 max-w-5 self-end" />
            <span>Back</span>
          </button>
        </div>
        
        <!-- Main Image Gallery -->
        <div class="mt-3 h-[550px] grid grid-cols-4 gap-5">
          <div class="col-span-4 relative h-full rounded-lg overflow-hidden">
            <img 
              :src="agencyImage"
              :alt="agent?.name"
              loading="lazy"
              class="object-cover object-center w-full h-full cursor-pointer"
            />
            <!-- Overlay with stats -->
            <div class="absolute left-0 bottom-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none text-white">
              <div class="h-full p-4 flex items-end justify-between">
                <div class="flex items-center gap-5">
                  <div class="flex items-center gap-1">
                    <img alt="album" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E" class="w-5" />
                    <p>1</p>
                  </div>
                  <div class="flex items-center gap-1">
                    <Camera class="w-5" />
                    <p></p>
                  </div>
                  <div class="flex items-center gap-1">
                    <Eye class="w-5" />
                    <p>19</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Agency Profile Section -->
      <div class="mt-3">
        <div class="flex items-center gap-4">
          <!-- Agency Avatar -->
          <div class="min-w-[120px] min-h-[120px] w-[120px] h-[120px] border-2 border-outlineVariant shadow-md rounded-full overflow-hidden">
            <img 
              :src="agencyAvatarImage"
              :alt="agent?.name"
              loading="lazy"
              class="object-cover object-center w-full h-full"
            />
          </div>
          
          <!-- Agency Info and Actions -->
          <div class="w-full flex justify-between">
            <div class="grow text-onSurfaceVariant flex flex-col gap-1.5">
              <p class="text-onSurface font-semibold text-xl">{{ agent?.name }}</p>
              <div class="flex items-center gap-1 -ms-1">
                <MapPin class="w-5 max-w-5 text-blue-500" />
                {{ agent?.address }}
              </div>
              <div class="flex items-center gap-1 text-sm">
                <p class="text-tertiary">( {{ agent?.propertiesCount }} Real estate )</p>
                <p class="text-xl">.</p>
                <p>{{ agent?.employeesCount || 0 }} Followers</p>
              </div>
            </div>
            <div class="flex gap-4">
              <button 
                type="button"
                class="transition-all bg-primary disabled:bg-primary/15 disabled:text-primary disabled:cursor-not-allowed text-onPrimary rounded-lg py-2.5 px-4 h-11 !bg-transparent text-primary border border-primary"
              >
                Share
              </button>
            </div>
          </div>
        </div>
        
        <!-- Divider -->
        <div class="mt-5 text-onSurfaceVariant pb-4 border-b border-outline"></div>
        
        <!-- News Section -->
        <div id="News" class="mt-4">
          <div class="flex items-center justify-between">
            <h3 class="text-onSurface font-semibold">News ( 0 )</h3>
          </div>
          <div class="text-primary flex items-center justify-center h-20">
            No news available
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar (3 columns) -->
    <div class="col-span-3 flex flex-col">
      <!-- Contact Information -->
      <div class="rounded-xl p-5 bg-surfaceContainerLow flex flex-col gap-5">
        <h1 class="text-onSurface font-semibold text-sm">Contact Information</h1>
        <div class="flex flex-col gap-3">
          <!-- Phone -->
          <div class="border border-outlineVariant rounded-lg py-2 px-3 flex items-center gap-2">
            <div class="bg-lightBlue/10 rounded-lg w-8 h-8 flex items-center justify-center">
              <Phone class="w-5 max-w-5" />
            </div>
            <p class="text-tertiary text-sm cursor-pointer" dir="ltr">{{ cleanPhone(agent?.phone) }}</p>
          </div>
          
          <!-- Facebook -->
          <div class="border border-outlineVariant rounded-lg py-2 px-3 flex items-center gap-2">
            <div class="bg-lightBlue/10 rounded-lg w-8 h-8 flex items-center justify-center">
              <Facebook class="w-5 max-w-5" />
            </div>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="text-tertiary text-sm cursor-pointer"
            >
              Facebook
            </a>
          </div>
          
          <!-- Working Hours -->
          <div class="cursor-pointer border border-outlineVariant rounded-lg py-2 px-3 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="bg-lightBlue/10 rounded-lg w-8 h-8 flex items-center justify-center">
                <Clock class="w-5 max-w-5" />
              </div>
              <p class="text-sm text-onSurface">View Working Hours</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Location Map -->
      <div class="mt-5 grow rounded-xl p-5 bg-surfaceContainerLow flex flex-col gap-5">
        <h1 class="text-onSurface font-semibold text-sm">Location on Map</h1>
        <div class="min-h-52 h-full">
          <div class="w-full h-full overflow-hidden rounded-3xl">
            <div class="mapdiv h-full relative overflow-hidden">
              <!-- Google Maps Embed -->
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.7!2d44.3661!3d33.3152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15577f67a0856d33%3A0x1fcfdb2a148de03a!2sBaghdad%2C%20Iraq!5e0!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style="border:0; border-radius: 1.5rem;"
                :allowfullscreen="true"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                class="w-full h-full"
              ></iframe>
              
              <!-- Map Controls Overlay -->
              <div class="absolute top-3 left-3 flex gap-2 z-10">
                <button 
                  @click="mapType = 'roadmap'"
                  :class="['px-3 py-1 rounded shadow text-sm transition-colors', mapType === 'roadmap' ? 'bg-white text-gray-900' : 'bg-gray-100 text-gray-600 hover:bg-white']"
                >
                  Map
                </button>
                <button 
                  @click="mapType = 'satellite'"
                  :class="['px-3 py-1 rounded shadow text-sm transition-colors', mapType === 'satellite' ? 'bg-white text-gray-900' : 'bg-gray-100 text-gray-600 hover:bg-white']"
                >
                  Satellite
                </button>
              </div>
              
              <!-- Fullscreen Button -->
              <button 
                @click="openFullscreenMap"
                class="absolute top-3 right-3 w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                title="View in full screen"
              >
                <Maximize class="h-4 w-4 text-gray-600" />
              </button>
              
              <!-- Location Marker Overlay -->
              <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs text-gray-700 max-w-48">
                <div class="flex items-center gap-1">
                  <MapPin class="h-3 w-3 text-red-500" />
                  <span class="font-medium">{{ agent?.name }}</span>
                </div>
                <p class="text-gray-600 mt-1">{{ agent?.address }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { 
  ArrowLeft, 
  Camera, 
  MapPin, 
  Phone, 
  Facebook,
  Clock,
  Maximize,
  Eye
} from 'lucide-vue-next'
import type { Agent } from '@/types/agent'
import { agentsService } from '@/services/agentsService'

// Get agent ID from URL parameters or use a default for demo
const agentId = 'a1' // In real app, this would come from route params

const agent = ref<Agent | null>(null)
const mapType = ref<'roadmap' | 'satellite'>('roadmap')

// Sample agency images
const agencyImage = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
const agencyAvatarImage = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'

onMounted(async () => {
  if (agentId) {
    agent.value = await agentsService.getAgentById(agentId)
  }
})

function goBack() {
  window.history.back()
}

function cleanPhone(phone?: string) {
  if (!phone) return ''
  return phone.replace(/^\+964\s*/, '')
}

function openFullscreenMap() {
  // Create Google Maps URL with Baghdad coordinates
  const mapUrl = `https://www.google.com/maps/@33.3152,44.3661,15z`
  window.open(mapUrl, '_blank')
}
</script>

<style scoped>
/* Custom CSS variables to match the reference design */
.custom-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.bg-surfaceContainerLow {
  background-color: #f8f9fa;
}

.text-onSurface {
  color: #1a1a1a;
}

.text-onSurfaceVariant {
  color: #666666;
}

.text-tertiary {
  color: #888888;
}

.border-outlineVariant {
  border-color: #e0e0e0;
}

.border-outline {
  border-color: #d0d0d0;
}

.bg-lightBlue\/10 {
  background-color: rgba(33, 150, 243, 0.1);
}

.text-onPrimary {
  color: white;
}

.bg-primary {
  background-color: #2196f3;
}

.text-primary {
  color: #2196f3;
}

.border-primary {
  border-color: #2196f3;
}
</style> 