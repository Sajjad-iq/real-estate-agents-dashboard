<template>
  <div class="w-full space-y-4">
    <!-- View Controls -->
    <div class="flex items-center justify-end">
   
      
      <div class="flex items-center space-x-2">
        <Select 
          :model-value="itemsPerPage.toString()"
          @update:model-value="(value) => { itemsPerPage = Number(value); updateItemsPerPage(); }"
        >
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="24">24</SelectItem>
            <SelectItem value="36">36</SelectItem>
            <SelectItem value="48">48</SelectItem>
          </SelectContent>
        </Select>
        <span class="text-sm text-muted-foreground">{{ $t('agencies.cards.itemsPerPage') }}</span>
      </div>
    </div>

    <!-- Cards Grid -->
    <div v-if="paginatedAgents.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <DropdownMenu v-for="agent in paginatedAgents" :key="agent.id">
        <DropdownMenuTrigger as-child>
          <Card class="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer group border-2 hover:border-primary/20">
            <div class="space-y-3">
              <!-- Header with Avatar and Status -->
              <div class="flex items-start justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                    <Building class="w-6 h-6 text-primary" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-sm text-foreground truncate">{{ agent.name }}</h3>
                    <p class="text-xs text-muted-foreground truncate">{{ agent.address }}</p>
                  </div>
                </div>
                <StatusBadge :status="agent.status" class="flex-shrink-0" />
              </div>

              <!-- Contact Info -->
              <div class="space-y-2">
                <div class="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Phone class="w-3 h-3" />
                  <span class="truncate" dir="ltr">{{ cleanPhone(agent.phone) }}</span>
                </div>
                <div class="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Calendar class="w-3 h-3" />
                  <span>{{ formatDate(agent.joinDate) }}</span>
                </div>
              </div>

              <!-- Stats -->
              <div class="grid grid-cols-2 gap-3 pt-2 border-t border-border">
                <div class="text-center">
                  <p class="text-lg font-bold text-foreground">{{ agent.propertiesCount }}</p>
                  <p class="text-xs text-muted-foreground">{{ $t('agencies.cards.properties') }}</p>
                </div>
                <div class="text-center">
                  <p class="text-lg font-bold text-foreground">{{ agent.branchesCount }}</p>
                  <p class="text-xs text-muted-foreground">{{ $t('agencies.cards.branches') }}</p>
                </div>
              </div>

              <!-- Revenue -->
              <div class="bg-muted/50 rounded-lg p-3 text-center">
                <p class="text-sm font-semibold text-primary">{{ formatCurrency(agent.subscriptionTotal) }}</p>
                <p class="text-xs text-muted-foreground">{{ $t('agencies.cards.revenue') }}</p>
              </div>

              <!-- Hover indicator -->
              <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center">
                <p class="text-xs text-primary">{{ $t('agencies.cards.clickForActions') }}</p>
              </div>
            </div>
          </Card>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" class="w-48">
          <DropdownMenuLabel>{{ agent.name }}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="viewProfile(agent)">
            <User class="mr-2 h-4 w-4" />
            {{ $t('agencies.table.actions.viewProfile') }}
          </DropdownMenuItem>
          <DropdownMenuItem @click="editProfile(agent)">
            <Edit class="mr-2 h-4 w-4" />
            {{ $t('agencies.table.actions.editProfile') }}
          </DropdownMenuItem>
          <DropdownMenuItem @click="viewProperties(agent)">
            <Building class="mr-2 h-4 w-4" />
            {{ $t('agencies.table.actions.viewProperties') }}
          </DropdownMenuItem>
          <DropdownMenuItem @click="sendWhatsApp(agent)">
            <MessageCircle class="mr-2 h-4 w-4" />
            {{ $t('agencies.table.actions.sendWhatsApp') }}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="deleteAgent(agent)" class="text-red-600 focus:text-red-600">
            <Trash2 class="mr-2 h-4 w-4" />
            {{ $t('agencies.table.actions.deleteAgent') }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <Building class="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <h3 class="text-lg font-medium text-foreground mb-2">{{ $t('agencies.cards.noAgencies') }}</h3>
      <p class="text-muted-foreground">{{ $t('agencies.cards.noAgenciesDescription') }}</p>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between space-x-2 py-4" v-if="totalPages > 1">
      <div class="text-sm text-muted-foreground">
        {{ $t('agencies.pagination.showing') }} {{ startItem }} - {{ endItem }} {{ $t('agencies.pagination.of') }} {{ filteredAgents.length }}
      </div>
      <div class="flex items-center space-x-2 rtl:flex-row-reverse">
        <Button
          variant="outline"
          size="sm"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          {{ $t('agencies.table.controls.previous') }}
        </Button>
        
        <div class="flex items-center space-x-1 rtl:flex-row-reverse">
          <Button
            v-for="page in visiblePages"
            :key="page"
            :variant="page === currentPage ? 'default' : 'outline'"
            size="sm"
            @click="goToPage(page)"
            class="w-8 h-8 p-0"
          >
            {{ page }}
          </Button>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          {{ $t('agencies.table.controls.next') }}
        </Button>
      </div>
    </div>

    <!-- Edit Agent Dialog -->
    <EditAgentDialog 
      :open="editDialogOpen" 
      :agent="selectedAgent"
      @update:open="editDialogOpen = $event"
      @agent-updated="handleAgentUpdated"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { 
  Building, 
  Phone, 
  Calendar,
  User, 
  Edit, 
  MessageCircle, 
  Trash2 
} from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import EditAgentDialog from '@/components/agents/EditAgentDialog.vue'
import type { Agent } from '@/types/agent'
import { agentsService } from '@/services/agentsService'

interface Props {
  agents: Agent[]
}

interface Emits {
  (e: 'agentDeleted', agentId: string): void
  (e: 'agentUpdated', agent: Agent): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { t } = useI18n()
const router = useRouter()

// Pagination state
const currentPage = ref(1)
const itemsPerPage = ref(12)

// Edit dialog state
const editDialogOpen = ref(false)
const selectedAgent = ref<Agent | null>(null)

// Computed properties
const filteredAgents = computed(() => props.agents)

const totalPages = computed(() => 
  Math.ceil(filteredAgents.value.length / itemsPerPage.value)
)

const paginatedAgents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredAgents.value.slice(start, end)
})

const startItem = computed(() => 
  filteredAgents.value.length === 0 ? 0 : (currentPage.value - 1) * itemsPerPage.value + 1
)

const endItem = computed(() => 
  Math.min(currentPage.value * itemsPerPage.value, filteredAgents.value.length)
)

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  // Adjust start if we're near the end
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

function updateItemsPerPage() {
  currentPage.value = 1 // Reset to first page when changing items per page
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function cleanPhone(phone?: string) {
  if (!phone) return ''
  return phone.replace(/^\+964\s*/, '')
}

// Action handlers
function viewProfile(agent: Agent) {
  router.push({ name: 'agent-profile', params: { agentId: agent.id } })
}

function editProfile(agent: Agent) {
  selectedAgent.value = agent
  editDialogOpen.value = true
}

function handleAgentUpdated(updatedAgent: Agent) {
  emit('agentUpdated', updatedAgent)
}

function viewProperties(agent: Agent) {
  router.push({ name: 'agent-properties', params: { agentId: agent.id } })
}

function sendWhatsApp(agent: Agent) {
  const whatsappUrl = agentsService.getWhatsAppLink(agent.phone)
  window.open(whatsappUrl, '_blank')
}

async function deleteAgent(agent: Agent) {
  if (confirm(`${t('agencies.table.actions.confirmDelete')} ${agent.name}?`)) {
    const success = await agentsService.deleteAgent(agent.id)
    if (success) {
      emit('agentDeleted', agent.id)
    }
  }
}
</script>

<style scoped>
/* Card hover effects */
.group:hover {
  transform: translateY(-2px);
}

/* RTL support */
[dir="rtl"] .grid {
  direction: rtl;
}

[dir="rtl"] .flex {
  direction: ltr;
}

[dir="rtl"] .space-x-2 > * + * {
  margin-left: 0;
  margin-right: 0.5rem;
}

[dir="rtl"] .space-x-3 > * + * {
  margin-left: 0;
  margin-right: 0.75rem;
}
</style> 