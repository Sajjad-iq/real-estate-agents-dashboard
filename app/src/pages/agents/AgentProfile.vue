<template>
  <div class="custom-container py-3 md:py-5 grid grid-cols-1 lg:grid-cols-10 gap-3 md:gap-5">
    <!-- Main Content (7 columns on desktop, full width on mobile) -->
    <div class="lg:col-span-7 rounded-xl p-3 md:p-5 bg-surfaceContainerLow order-2 lg:order-1">
      <!-- Gallery Section -->
      <div id="Gallery">
        
        <!-- Main Image Gallery -->
        <div class="mt-3 h-[300px] md:h-[400px] lg:h-[550px] grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-5">
                      <div class="md:col-span-4 relative h-full rounded-lg overflow-hidden">
            <img 
              :src="agencyImage"
              :alt="agent?.name"
              loading="lazy"
              class="object-cover object-center w-full h-full cursor-pointer"
            />
            <!-- Overlay with stats -->
            <div class="absolute left-0 bottom-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none text-white">
              <div class="h-full p-2 md:p-4 flex items-end justify-between">
                <div class="flex items-center gap-2 md:gap-5">
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
        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <!-- Agency Avatar -->
          <div class="min-w-[80px] min-h-[80px] w-[80px] h-[80px] md:min-w-[120px] md:min-h-[120px] md:w-[120px] md:h-[120px] border-2 border-outlineVariant shadow-md rounded-full overflow-hidden flex-shrink-0">
            <img 
              :src="agencyAvatarImage"
              :alt="agent?.name"
              loading="lazy"
              class="object-cover object-center w-full h-full"
            />
          </div>
          
          <!-- Agency Info and Actions -->
          <div class="w-full flex flex-col sm:flex-row sm:justify-between gap-4">
            <div class="grow text-onSurfaceVariant flex flex-col gap-1.5 text-center sm:text-left">
              <p class="text-onSurface font-semibold text-lg md:text-xl">{{ agent?.name }}</p>
              <div class="flex items-center justify-center sm:justify-start gap-1 -ms-1">
                <MapPin class="w-4 md:w-5 max-w-5 text-blue-500" />
                <span class="text-sm md:text-base">{{ agent?.address }}</span>
              </div>
              <div class="flex items-center justify-center sm:justify-start gap-1 text-xs md:text-sm">
                <p class="text-tertiary">( {{ agent?.propertiesCount }} Real estate )</p>
                <p class="text-lg md:text-xl">.</p>
                <p>{{ agent?.employeesCount || 0 }} Followers</p>
              </div>
            </div>
            <div class="flex justify-center sm:justify-end gap-4">
              <button 
                type="button"
                class="transition-all bg-primary disabled:bg-primary/15 disabled:text-primary disabled:cursor-not-allowed text-onPrimary rounded-lg py-2 px-3 md:py-2.5 md:px-4 h-9 md:h-11 text-sm md:text-base !bg-transparent text-primary border border-primary"
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

    <!-- Sidebar (3 columns on desktop, full width on mobile) -->
    <div class="lg:col-span-3 flex flex-col order-1 lg:order-2">
      <!-- Contact Information -->
      <div class="rounded-xl p-3 md:p-5 bg-surfaceContainerLow flex flex-col gap-3 md:gap-5">
        <h1 class="text-onSurface font-semibold text-sm md:text-base">Contact Information</h1>
        <div class="flex flex-col gap-2 md:gap-3">
          <!-- Phone -->
          <div class="border border-outlineVariant rounded-lg py-2 px-3 flex items-center gap-2">
            <div class="bg-lightBlue/10 rounded-lg w-6 h-6 md:w-8 md:h-8 flex items-center justify-center flex-shrink-0">
              <Phone class="w-3 md:w-5 max-w-5" />
            </div>
            <p class="text-tertiary text-xs md:text-sm cursor-pointer break-all" dir="ltr">{{ cleanPhone(agent?.phone) }}</p>
          </div>
          
          <!-- Facebook -->
          <div class="border border-outlineVariant rounded-lg py-2 px-3 flex items-center gap-2">
            <div class="bg-lightBlue/10 rounded-lg w-6 h-6 md:w-8 md:h-8 flex items-center justify-center flex-shrink-0">
              <Facebook class="w-3 md:w-5 max-w-5" />
            </div>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="text-tertiary text-xs md:text-sm cursor-pointer"
            >
              Facebook
            </a>
          </div>
          
          <!-- Working Hours -->
          <div class="cursor-pointer border border-outlineVariant rounded-lg py-2 px-3 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="bg-lightBlue/10 rounded-lg w-6 h-6 md:w-8 md:h-8 flex items-center justify-center flex-shrink-0">
                <Clock class="w-3 md:w-5 max-w-5" />
              </div>
              <p class="text-xs md:text-sm text-onSurface">View Working Hours</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Location Map -->
      <div class="mt-3 md:mt-5 grow rounded-xl p-3 md:p-5 bg-surfaceContainerLow flex flex-col gap-3 md:gap-5">
        <h1 class="text-onSurface font-semibold text-sm md:text-base">Location on Map</h1>
        <div class="min-h-48 md:min-h-52 h-full">
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
              <div class="absolute top-2 md:top-3 left-2 md:left-3 flex gap-1 md:gap-2 z-10">
                <button 
                  @click="mapType = 'roadmap'"
                  :class="['px-2 md:px-3 py-1 rounded shadow text-xs md:text-sm transition-colors', mapType === 'roadmap' ? 'bg-white text-gray-900' : 'bg-gray-100 text-gray-600 hover:bg-white']"
                >
                  Map
                </button>
                <button 
                  @click="mapType = 'satellite'"
                  :class="['px-2 md:px-3 py-1 rounded shadow text-xs md:text-sm transition-colors', mapType === 'satellite' ? 'bg-white text-gray-900' : 'bg-gray-100 text-gray-600 hover:bg-white']"
                >
                  Satellite
                </button>
              </div>
              
              <!-- Fullscreen Button -->
              <button 
                @click="openFullscreenMap"
                class="absolute top-2 md:top-3 right-2 md:right-3 w-6 h-6 md:w-8 md:h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                title="View in full screen"
              >
                <Maximize class="h-3 w-3 md:h-4 md:w-4 text-gray-600" />
              </button>
              
              <!-- Location Marker Overlay -->
              <div class="absolute bottom-2 md:bottom-4 left-2 md:left-4 bg-white/90 backdrop-blur-sm rounded-lg p-1.5 md:p-2 text-xs text-gray-700 max-w-40 md:max-w-48">
                <div class="flex items-center gap-1">
                  <MapPin class="h-2.5 w-2.5 md:h-3 md:w-3 text-red-500 flex-shrink-0" />
                  <span class="font-medium text-xs truncate">{{ agent?.name }}</span>
                </div>
                <p class="text-gray-600 mt-0.5 md:mt-1 text-xs truncate">{{ agent?.address }}</p>
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
  padding: 0 0.75rem;
}

@media (min-width: 768px) {
  .custom-container {
    padding: 0 1rem;
  }
}

@media (min-width: 1024px) {
  .custom-container {
    padding: 0 1.5rem;
  }
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