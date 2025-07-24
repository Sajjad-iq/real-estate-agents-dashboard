<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-foreground mb-2">{{ $t('agencies.dashboard.title') }}</h1>
      <p class="text-muted-foreground text-lg">{{ $t('agencies.dashboard.subtitle') }}</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
      <Card class="p-4 md:p-6 stats-card card-enhanced">
        <div class="flex items-center">
          <div class="p-2 md:p-3 bg-primary/10 rounded-lg md:rounded-xl flex-shrink-0">
            <User class="h-5 w-5 md:h-7 md:w-7 text-primary" />
          </div>
          <div class="ml-3 md:ml-4 rtl:mr-3 rtl:md:mr-4 min-w-0 flex-1">
            <p class="text-xs md:text-sm text-muted-foreground font-medium truncate">{{ $t('agencies.stats.totalAgencies') }}</p>
            <p class="text-xl md:text-3xl font-bold text-foreground">{{ totalAgents }}</p>
          </div>
        </div>
      </Card>
      
      <Card class="p-4 md:p-6 stats-card card-enhanced">
        <div class="flex items-center">
          <div class="p-2 md:p-3 bg-teal-100 rounded-lg md:rounded-xl flex-shrink-0">
            <CheckCircle class="h-5 w-5 md:h-7 md:w-7 text-teal-600" />
          </div>
          <div class="ml-3 md:ml-4 rtl:mr-3 rtl:md:mr-4 min-w-0 flex-1">
            <p class="text-xs md:text-sm text-muted-foreground font-medium truncate">{{ $t('agencies.stats.activeAgencies') }}</p>
            <p class="text-xl md:text-3xl font-bold text-teal-700">{{ activeAgents }}</p>
          </div>
        </div>
      </Card>
      
      <Card class="p-4 md:p-6 stats-card card-enhanced">
        <div class="flex items-center">
          <div class="p-2 md:p-3 bg-amber-100 rounded-lg md:rounded-xl flex-shrink-0">
            <Clock class="h-5 w-5 md:h-7 md:w-7 text-amber-600" />
          </div>
          <div class="ml-3 md:ml-4 rtl:mr-3 rtl:md:mr-4 min-w-0 flex-1">
            <p class="text-xs md:text-sm text-muted-foreground font-medium truncate">{{ $t('agencies.stats.pending') }}</p>
            <p class="text-xl md:text-3xl font-bold text-amber-700">{{ pendingAgents }}</p>
          </div>
        </div>
      </Card>
      
      <Card class="p-4 md:p-6 stats-card card-enhanced">
        <div class="flex items-center">
          <div class="p-2 md:p-3 bg-primary/10 rounded-lg md:rounded-xl flex-shrink-0">
            <DollarSign class="h-5 w-5 md:h-7 md:w-7 text-primary" />
          </div>
          <div class="ml-3 md:ml-4 rtl:mr-3 rtl:md:mr-4 min-w-0 flex-1">
            <p class="text-xs md:text-sm text-muted-foreground font-medium truncate">{{ $t('agencies.stats.totalRevenue') }}</p>
            <p class="text-xl md:text-3xl font-bold text-primary">${{ totalRevenue.toLocaleString() }}</p>
          </div>
        </div>
      </Card>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p class="text-gray-600">{{ $t('agencies.states.loading') }}</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
      <div class="flex items-center">
        <AlertCircle class="h-6 w-6 text-red-600 mr-3" />
        <div>
          <h3 class="text-lg font-medium text-red-800">{{ $t('agencies.states.error') }}</h3>
          <p class="text-red-700">{{ error }}</p>
        </div>
      </div>
      <Button @click="loadAgents" class="mt-4" variant="outline">
        {{ $t('agencies.states.tryAgain') }}
      </Button>
    </div>

    <!-- Dashboard Content -->
    <div v-else>
      <!-- Filter Bar and View Toggle -->
      <div class="flex flex-col gap-4 mb-6">
        <FilterBar v-model="filters" @update:model-value="updateFilters" class="flex-1" />
        
        <!-- View Toggle -->
        <div class="flex items-center gap-2 bg-muted rounded-lg p-1 w-fit">
          <Button
            :variant="viewMode === 'table' ? 'default' : 'ghost'"
            size="sm"
            @click="viewMode = 'table'"
            class="px-3"
          >
            <Grid3X3 class="w-4 h-4 mr-2" />
            {{ $t('agencies.views.table') }}
          </Button>
          <Button
            :variant="viewMode === 'cards' ? 'default' : 'ghost'"
            size="sm"
            @click="viewMode = 'cards'"
            class="px-3"
          >
            <LayoutGrid class="w-4 h-4 mr-2" />
            {{ $t('agencies.views.cards') }}
          </Button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredAgents.length === 0" class="text-center py-12">
        <div class="mx-auto h-24 w-24 text-gray-400 mb-4">
          <User class="h-full w-full" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">{{ $t('agencies.states.noAgenciesFound') }}</h3>
        <p class="text-gray-600 mb-4">
          {{ agents.length === 0 ? $t('agencies.states.noAgenciesAdded') : $t('agencies.states.adjustFilters') }}
        </p>
        <Button v-if="agents.length > 0" @click="clearFilters" variant="outline">
          {{ $t('agencies.states.clearFilters') }}
        </Button>
      </div>

      <!-- Agents Display -->
      <div v-else>
        <!-- Table View -->
        <AgentsTable 
          v-if="viewMode === 'table'"
          :agents="filteredAgents"
          @agent-deleted="handleAgentDeleted"
          @agent-updated="handleAgentUpdated"
        />
        
        <!-- Cards View -->
        <AgentsCards 
          v-else-if="viewMode === 'cards'"
          :agents="filteredAgents"
          @agent-deleted="handleAgentDeleted"
          @agent-updated="handleAgentUpdated"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FilterBar from '@/components/ui/FilterBar.vue';
import AgentsTable from '@/components/agents/AgentsTable.vue';
import AgentsCards from '@/components/agents/AgentsCards.vue';
import { useAgents } from '@/composables/useAgents';
import type { Agent } from '@/types/agent';
import { 
  User, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  AlertCircle,
  Grid3X3,
  LayoutGrid
} from 'lucide-vue-next';
import type { AgentFilters } from '@/types/agent';

// Use the agents composable
const {
  agents,
  filteredAgents,
  loading,
  error,
  filters,
  loadAgents,
  removeAgent,
  updateFilters: updateFiltersComposable,
} = useAgents();

// View mode state
const viewMode = ref<'table' | 'cards'>('table');

// Computed stats
const totalAgents = computed(() => agents.value.length);

const activeAgents = computed(() => 
  agents.value.filter(agent => agent.status === 'active').length
);

const pendingAgents = computed(() => 
  agents.value.filter(agent => agent.status === 'pending').length
);

const totalRevenue = computed(() => 
  agents.value.reduce((sum, agent) => sum + agent.subscriptionTotal, 0)
);

// Methods
function updateFilters(newFilters: AgentFilters) {
  updateFiltersComposable(newFilters);
}

function clearFilters() {
  updateFilters({});
}

function handleAgentDeleted(agentId: string) {
  removeAgent(agentId);
}

function handleAgentUpdated(updatedAgent: Agent) {
  const index = agents.value.findIndex(agent => agent.id === updatedAgent.id)
  if (index !== -1) {
    agents.value[index] = updatedAgent
  }
}

// Load data on component mount
onMounted(() => {
  loadAgents();
});
</script> 