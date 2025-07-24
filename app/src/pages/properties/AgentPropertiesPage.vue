<template>
  <div class="w-full py-5 px-5 space-y-6">
    <!-- Loading State -->
    <PropertiesTableSkeleton v-if="loading" />

    <!-- Content when not loading -->
    <template v-else>
      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">
            {{ $t('properties.title') }}
          </h1>
          <p class="text-gray-600 mt-1" v-if="agent">
            {{ $t('properties.subtitle', { agentName: agent.name, count: properties.length }) }}
          </p>
        </div>
        <Button @click="goBack" variant="outline">
          <ArrowLeft class="w-4 h-4 mr-2" />
          {{ $t('properties.actions.back') }}
        </Button>
      </div>

      <!-- Agent Info Card -->
      <Card v-if="agent" class="p-6">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Building class="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-900">{{ agent.name }}</h2>
            <p class="text-gray-600">{{ agent.address }}</p>
            <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span class="flex items-center gap-1">
                <Phone class="w-4 h-4" />
                {{ agent.phone }}
              </span>
              <span class="flex items-center gap-1">
                <Building class="w-4 h-4" />
                {{ $t('properties.stats.totalProperties', { count: agent.propertiesCount }) }}
              </span>
            </div>
          </div>
        </div>
      </Card>

          <!-- Error State -->
      <div v-if="error" class="text-center py-12">
        <AlertCircle class="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">{{ $t('properties.states.error') }}</h3>
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <Button @click="loadProperties" variant="outline">
          {{ $t('properties.states.tryAgain') }}
        </Button>
      </div>

      <!-- Properties Table -->
      <Card v-else-if="properties.length > 0" class="overflow-hidden">
        <div class="overflow-auto">
          <Table class="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>{{ $t('properties.table.columns.image') }}</TableHead>
                <TableHead>{{ $t('properties.table.columns.title') }}</TableHead>
                <TableHead>{{ $t('properties.table.columns.type') }}</TableHead>
                <TableHead>{{ $t('properties.table.columns.location') }}</TableHead>
                <TableHead>{{ $t('properties.table.columns.price') }}</TableHead>
                <TableHead>{{ $t('properties.table.columns.bedrooms') }}</TableHead>
                <TableHead>{{ $t('properties.table.columns.bathrooms') }}</TableHead>
                <TableHead>{{ $t('properties.table.columns.area') }}</TableHead>
                <TableHead>{{ $t('properties.table.columns.status') }}</TableHead>
                <TableHead>{{ $t('properties.table.columns.actions') }}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="property in properties" :key="property.id" class="hover:bg-gray-50">
                <TableCell>
                  <div class="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                    <img 
                      :src="property.image" 
                      :alt="property.title"
                      class="w-full h-full object-cover"
                      @error="handleImageError"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p class="font-medium text-gray-900">{{ property.title }}</p>
                    <p class="text-sm text-gray-500">{{ $t('properties.table.id') }}: {{ property.id }}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {{ $t(`properties.types.${property.type}`) }}
                  </span>
                </TableCell>
                <TableCell>
                  <div class="flex items-center gap-1">
                    <MapPin class="w-4 h-4 text-gray-400" />
                    <span class="text-sm">{{ property.location }}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span class="font-semibold text-green-600">
                    {{ formatCurrency(property.price) }}
                  </span>
                </TableCell>
                <TableCell>
                  <div class="flex items-center gap-1">
                    <User class="w-4 h-4 text-gray-400" />
                    <span>{{ property.bedrooms }}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div class="flex items-center gap-1">
                    <Droplets class="w-4 h-4 text-gray-400" />
                    <span>{{ property.bathrooms }}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span class="text-sm">{{ property.area }} {{ $t('properties.units.sqm') }}</span>
                </TableCell>
                <TableCell>
                  <PropertyStatusBadge :status="property.status" />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal class="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem @click="viewProperty(property)">
                        <Eye class="w-4 h-4 mr-2" />
                        {{ $t('properties.actions.view') }}
                      </DropdownMenuItem>
                      <DropdownMenuItem @click="editProperty(property)">
                        <Edit class="w-4 h-4 mr-2" />
                        {{ $t('properties.actions.edit') }}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem @click="deleteProperty(property)" class="text-red-600">
                        <Trash2 class="w-4 h-4 mr-2" />
                        {{ $t('properties.actions.delete') }}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>

      <!-- Empty State -->
      <Card v-else class="p-12 text-center">
        <Home class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">{{ $t('properties.states.noProperties') }}</h3>
        <p class="text-gray-600 mb-4" v-if="agent">
          {{ $t('properties.states.noPropertiesDescription', { agentName: agent.name }) }}
        </p>
        <Button @click="addProperty" variant="outline">
          <Plus class="w-4 h-4 mr-2" />
          {{ $t('properties.actions.addProperty') }}
        </Button>
      </Card>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { 
  ArrowLeft, 
  Building, 
  Phone, 
  MapPin, 
  User, 
  Droplets, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Home, 
  Plus,
  AlertCircle 
} from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import PropertyStatusBadge from '@/components/properties/PropertyStatusBadge.vue'
import PropertiesTableSkeleton from '@/components/properties/PropertiesTableSkeleton.vue'

import type { Agent } from '@/types/agent'
import type { Property } from '@/types/property'
import { agentsService } from '@/services/agentsService'
import { propertiesService } from '@/services/propertiesService'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const loading = ref(true)
const error = ref<string | null>(null)
const agent = ref<Agent | null>(null)
const properties = ref<Property[]>([])

const agentId = computed(() => route.params.agentId as string)

onMounted(async () => {
  await loadAgent()
  await loadProperties()
})

async function loadAgent() {
  try {
    if (agentId.value) {
      agent.value = await agentsService.getAgentById(agentId.value)
      if (!agent.value) {
        error.value = t('properties.states.agentNotFound')
      }
    }
  } catch (err) {
    error.value = t('properties.states.errorLoadingAgent')
    console.error('Error loading agent:', err)
  }
}

async function loadProperties() {
  try {
    loading.value = true
    error.value = null
    
    if (agentId.value) {
      properties.value = await propertiesService.getPropertiesByAgent(agentId.value)
    }
  } catch (err) {
    error.value = t('properties.states.errorLoadingProperties')
    console.error('Error loading properties:', err)
  } finally {
    loading.value = false
  }
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/64x64?text=No+Image'
}

function goBack() {
  router.go(-1)
}

function viewProperty(property: Property) {
  // TODO: Implement property detail page
  // router.push({ name: 'property-detail', params: { propertyId: property.id } })
  alert(`View property: ${property.title}`)
}

function editProperty(property: Property) {
  // TODO: Implement edit property functionality
  alert(`Edit property: ${property.title}`)
}

function addProperty() {
  // TODO: Implement add property functionality
  alert('Add new property')
}

function deleteProperty(property: Property) {
  if (confirm(t('properties.actions.confirmDelete', { title: property.title }))) {
    // TODO: Implement delete property functionality
    alert(`Delete property: ${property.title}`)
  }
}
</script> 