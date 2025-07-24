<template>
  <div class="space-y-4">
    <!-- Table -->
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              v-for="column in columns" 
              :key="column.key"
              :class="['cursor-pointer hover:bg-muted/50', column.align === 'right' ? 'text-right' : '']"
              @click="handleSort(column.key)"
            >
              <div class="flex items-center gap-2" :class="column.align === 'right' ? 'justify-end' : ''">
                {{ column.label }}
                <span v-if="sortState.column === column.key" class="text-muted-foreground">
                  {{ sortState.direction === 'asc' ? '↑' : '↓' }}
                </span>
              </div>
            </TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="agent in paginatedAgents" :key="agent.id">
            <TableCell class="font-medium">{{ agent.name }}</TableCell>
            <TableCell>{{ agent.phone }}</TableCell>
            <TableCell>{{ agent.address }}</TableCell>
            <TableCell>{{ formatDate(agent.joinDate) }}</TableCell>
            <TableCell class="text-right">{{ agent.propertiesCount }}</TableCell>
            <TableCell class="text-right">{{ agent.branchesCount }}</TableCell>
            <TableCell class="text-right">{{ agent.employeesCount }}</TableCell>
            <TableCell class="text-right">${{ agent.subscriptionTotal.toLocaleString() }}</TableCell>
            <TableCell>
              <StatusBadge :status="agent.status" />
            </TableCell>
            <TableCell class="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal class="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem @click="viewProfile(agent)">
                    <User class="mr-2 h-4 w-4" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="editProfile(agent)">
                    <Edit class="mr-2 h-4 w-4" />
                    Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="viewProperties(agent)">
                    <Building class="mr-2 h-4 w-4" />
                    View Properties
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="sendWhatsApp(agent)">
                    <MessageCircle class="mr-2 h-4 w-4" />
                    Send WhatsApp
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    @click="deleteAgent(agent)"
                    class="text-red-600 focus:text-red-600"
                  >
                    <Trash2 class="mr-2 h-4 w-4" />
                    Delete Agent
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>

    <!-- Pagination -->
    <div class="flex items-center justify-between px-2">
      <div class="text-sm text-muted-foreground">
        Showing {{ startIndex }} to {{ endIndex }} of {{ filteredAgents.length }} agents
      </div>
      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="pagination.page === 1"
          @click="goToPage(pagination.page - 1)"
        >
          Previous
        </Button>
        <div class="flex items-center space-x-1">
          <Button
            v-for="page in visiblePages"
            :key="page"
            :variant="page === pagination.page ? 'default' : 'outline'"
            size="sm"
            @click="goToPage(page)"
          >
            {{ page }}
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          :disabled="pagination.page === totalPages"
          @click="goToPage(pagination.page + 1)"
        >
          Next
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import StatusBadge from '@/components/ui/StatusBadge.vue';
import { MoreHorizontal, User, Edit, Building, MessageCircle, Trash2 } from 'lucide-vue-next';
import type { Agent, SortState, PaginationState } from '@/types/agent';
import { agentsService } from '@/services/agentsService';

interface Props {
  agents: Agent[];
}

interface Emits {
  (e: 'agentDeleted', agentId: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Table columns configuration
const columns = [
  { key: 'name' as keyof Agent, label: 'Name' },
  { key: 'phone' as keyof Agent, label: 'Phone' },
  { key: 'address' as keyof Agent, label: 'Address' },
  { key: 'joinDate' as keyof Agent, label: 'Join Date' },
  { key: 'propertiesCount' as keyof Agent, label: 'Properties', align: 'right' },
  { key: 'branchesCount' as keyof Agent, label: 'Branches', align: 'right' },
  { key: 'employeesCount' as keyof Agent, label: 'Employees', align: 'right' },
  { key: 'subscriptionTotal' as keyof Agent, label: 'Subscription', align: 'right' },
  { key: 'status' as keyof Agent, label: 'Status' },
];

// Sorting state
const sortState = ref<SortState>({
  column: null,
  direction: 'asc'
});

// Pagination state
const pagination = ref<PaginationState>({
  page: 1,
  pageSize: 10,
  total: 0
});

// Computed values
const filteredAgents = computed(() => props.agents);

const sortedAgents = computed(() => {
  let sorted = [...filteredAgents.value];
  
  if (sortState.value.column) {
    sorted.sort((a, b) => {
      const aValue = a[sortState.value.column!];
      const bValue = b[sortState.value.column!];
      
      let comparison = 0;
      if (aValue < bValue) comparison = -1;
      if (aValue > bValue) comparison = 1;
      
      return sortState.value.direction === 'desc' ? -comparison : comparison;
    });
  }
  
  return sorted;
});

const totalPages = computed(() => 
  Math.ceil(sortedAgents.value.length / pagination.value.pageSize)
);

const paginatedAgents = computed(() => {
  const start = (pagination.value.page - 1) * pagination.value.pageSize;
  const end = start + pagination.value.pageSize;
  return sortedAgents.value.slice(start, end);
});

const startIndex = computed(() => 
  (pagination.value.page - 1) * pagination.value.pageSize + 1
);

const endIndex = computed(() => 
  Math.min(pagination.value.page * pagination.value.pageSize, sortedAgents.value.length)
);

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  const current = pagination.value.page;
  const total = totalPages.value;
  
  let start = Math.max(1, current - Math.floor(maxVisible / 2));
  let end = Math.min(total, start + maxVisible - 1);
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  return pages;
});

// Methods
function handleSort(column: keyof Agent) {
  if (sortState.value.column === column) {
    sortState.value.direction = sortState.value.direction === 'asc' ? 'desc' : 'asc';
  } else {
    sortState.value.column = column;
    sortState.value.direction = 'asc';
  }
}

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    pagination.value.page = page;
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Action handlers
function viewProfile(agent: Agent) {
  // Placeholder for view profile action
  alert(`Viewing profile for ${agent.name}`);
}

function editProfile(agent: Agent) {
  // Placeholder for edit profile action
  alert(`Editing profile for ${agent.name}`);
}

function viewProperties(agent: Agent) {
  // Placeholder for view properties action
  alert(`Viewing properties for ${agent.name} (${agent.propertiesCount} properties)`);
}

function sendWhatsApp(agent: Agent) {
  const whatsappUrl = agentsService.getWhatsAppLink(agent.phone);
  window.open(whatsappUrl, '_blank');
}

async function deleteAgent(agent: Agent) {
  if (confirm(`Are you sure you want to delete ${agent.name}?`)) {
    const success = await agentsService.deleteAgent(agent.id);
    if (success) {
      emit('agentDeleted', agent.id);
      // Adjust pagination if needed
      if (paginatedAgents.value.length === 1 && pagination.value.page > 1) {
        pagination.value.page--;
      }
    }
  }
}
</script> 