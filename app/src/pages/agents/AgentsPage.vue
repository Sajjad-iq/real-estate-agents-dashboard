<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-foreground mb-2">Agencies Dashboard</h1>
      <p class="text-muted-foreground text-lg">Manage and monitor your Iraqi real estate agency network</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card class="p-6 stats-card card-enhanced">
        <div class="flex items-center">
          <div class="p-3 bg-primary/10 rounded-xl">
            <User class="h-7 w-7 text-primary" />
          </div>
          <div class="ml-4">
            <p class="text-sm text-muted-foreground font-medium">Total Agencies</p>
            <p class="text-3xl font-bold text-foreground">{{ totalAgents }}</p>
          </div>
        </div>
      </Card>
      
      <Card class="p-6 stats-card card-enhanced">
        <div class="flex items-center">
          <div class="p-3 bg-teal-100 rounded-xl">
            <CheckCircle class="h-7 w-7 text-teal-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm text-muted-foreground font-medium">Active Agencies</p>
            <p class="text-3xl font-bold text-teal-700">{{ activeAgents }}</p>
          </div>
        </div>
      </Card>
      
      <Card class="p-6 stats-card card-enhanced">
        <div class="flex items-center">
          <div class="p-3 bg-amber-100 rounded-xl">
            <Clock class="h-7 w-7 text-amber-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm text-muted-foreground font-medium">Pending</p>
            <p class="text-3xl font-bold text-amber-700">{{ pendingAgents }}</p>
          </div>
        </div>
      </Card>
      
      <Card class="p-6 stats-card card-enhanced">
        <div class="flex items-center">
          <div class="p-3 bg-primary/10 rounded-xl">
            <DollarSign class="h-7 w-7 text-primary" />
          </div>
          <div class="ml-4">
            <p class="text-sm text-muted-foreground font-medium">Total Revenue</p>
            <p class="text-3xl font-bold text-primary">${{ totalRevenue.toLocaleString() }}</p>
          </div>
        </div>
      </Card>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p class="text-gray-600">Loading agents...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
      <div class="flex items-center">
        <AlertCircle class="h-6 w-6 text-red-600 mr-3" />
        <div>
          <h3 class="text-lg font-medium text-red-800">Error</h3>
          <p class="text-red-700">{{ error }}</p>
        </div>
      </div>
      <Button @click="loadAgents" class="mt-4" variant="outline">
        Try Again
      </Button>
    </div>

    <!-- Dashboard Content -->
    <div v-else>
      <!-- Filter Bar -->
      <FilterBar v-model="filters" @update:model-value="updateFilters" />

      <!-- Empty State -->
      <div v-if="filteredAgents.length === 0" class="text-center py-12">
        <div class="mx-auto h-24 w-24 text-gray-400 mb-4">
          <User class="h-full w-full" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No agencies found</h3>
        <p class="text-gray-600 mb-4">
          {{ agents.length === 0 ? 'No agencies have been added yet.' : 'Try adjusting your filters.' }}
        </p>
        <Button v-if="agents.length > 0" @click="clearFilters" variant="outline">
          Clear Filters
        </Button>
      </div>

      <!-- Agents Table -->
      <AgentsTable 
        v-else
        :agents="filteredAgents"
        @agent-deleted="handleAgentDeleted"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FilterBar from '@/components/ui/FilterBar.vue';
import AgentsTable from '@/components/agents/AgentsTable.vue';
import { useAgents } from '@/composables/useAgents';
import { 
  User, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  AlertCircle 
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

// Load data on component mount
onMounted(() => {
  loadAgents();
});
</script> 