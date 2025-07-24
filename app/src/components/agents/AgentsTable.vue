<template>
  <div class="w-full space-y-4">
    <!-- Table Controls -->
    <div class="flex items-center justify-between flex-1">

      <div class="flex items-center space-x-2">
      <div class="flex items-center gap-4">
        <span class="text-sm text-muted-foreground">{{ $t('agencies.cards.itemsPerPage') }}</span>

        <Select 
          :model-value="table.getState().pagination.pageSize.toString()"
          @update:model-value="(value) => table.setPageSize(Number(value))"
        >
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
      </div>
     
      
      <div class="flex items-center space-x-2 flex-0 self-end">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" class="btn-secondary">
              {{ $t('agencies.table.controls.columns') }} <ChevronDown class="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
                         <DropdownMenuCheckboxItem
               v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
               :key="column.id"
               class="capitalize"
               :model-value="column.getIsVisible()"
               @update:model-value="(value) => column.toggleVisibility(!!value)"
             >
              {{ getColumnDisplayName(column.id) }}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <!-- Data Table -->
    <div class="card-enhanced rounded-md border w-full overflow-auto">
      <Table class="table-modern min-w-full w-full" :style="`width: ${table.getCenterTotalSize()}px`">
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead 
              v-for="header in headerGroup.headers" 
              :key="header.id"
              :style="`width: ${header.getSize()}px`"
              class="relative"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />

            </TableHead>
          </TableRow>
        </TableHeader class="w-full">
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <DropdownMenu v-for="row in table.getRowModel().rows" :key="row.id">
              <DropdownMenuTrigger as-child>
                <TableRow
                  :data-state="row.getIsSelected() && 'selected'"
                  class="hover:bg-primary/2 transition-colors cursor-pointer"
                >
                  <TableCell 
                    v-for="cell in row.getVisibleCells()" 
                    :key="cell.id"
                    :style="`width: ${cell.column.getSize()}px`"
                    @click="handleCellClick(cell.column.id, $event)"
                  >
                    <FlexRender
                      :render="cell.column.columnDef.cell"
                      :props="cell.getContext()"
                    />
                  </TableCell>
                </TableRow>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" class="w-48">
                <DropdownMenuLabel>{{ row.original.name }}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="viewProfile(row.original)">
                  <User class="mr-2 h-4 w-4" />
                  {{ t('agencies.table.actions.viewProfile') }}
                </DropdownMenuItem>
                <DropdownMenuItem @click="editProfile(row.original)">
                  <Edit class="mr-2 h-4 w-4" />
                  {{ t('agencies.table.actions.editProfile') }}
                </DropdownMenuItem>
                <DropdownMenuItem @click="viewProperties(row.original)">
                  <Building class="mr-2 h-4 w-4" />
                  {{ t('agencies.table.actions.viewProperties') }}
                </DropdownMenuItem>
                <DropdownMenuItem @click="sendWhatsApp(row.original)">
                  <MessageCircle class="mr-2 h-4 w-4" />
                  {{ t('agencies.table.actions.sendWhatsApp') }}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="deleteAgent(row.original)" class="text-red-600 focus:text-red-600">
                  <Trash2 class="mr-2 h-4 w-4" />
                  {{ t('agencies.table.actions.deleteAgent') }}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </template>
          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              {{ $t('agencies.table.controls.noAgenciesFound') }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Pagination -->
    <div class="flex flex-col md:flex-row gap-4 items-center justify-between space-x-2 py-4" v-if="table.getPageCount() > 1">

      <div class="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          {{ $t('agencies.table.controls.previous') }}
        </Button>
        
        <div class="flex items-center gap-1">
          <Button
            v-for="page in visibleTablePages"
            :key="page"
            :variant="page === table.getState().pagination.pageIndex + 1 ? 'default' : 'outline'"
            size="sm"
            @click="table.setPageIndex(page - 1)"
            class="w-8 h-8 p-0"
          >
            {{ page }}
          </Button>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          {{ $t('agencies.table.controls.next') }}
        </Button>
      </div>
      
      <div class="text-sm text-muted-foreground">
        {{ $t('agencies.pagination.showing') }} {{ startItem }} - {{ endItem }} {{ $t('agencies.pagination.of') }} {{ table.getFilteredRowModel().rows.length }}
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
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { ArrowUpDown, ChevronDown, User, Edit, Building, MessageCircle, Trash2 } from 'lucide-vue-next'
import { h, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { valueUpdater } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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

// Check if we're in RTL mode
const isRTL = computed(() => {
  if (typeof document !== 'undefined') {
    return document.documentElement.dir === 'rtl'
  }
  return false
})

// Pagination computed properties
const startItem = computed(() => 
  table.getFilteredRowModel().rows.length === 0 ? 0 : table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1
)

const endItem = computed(() => 
  Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)
)

const visibleTablePages = computed(() => {
  const pages = []
  const maxVisible = 5
  const currentPage = table.getState().pagination.pageIndex + 1
  const totalPages = table.getPageCount()
  
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages, start + maxVisible - 1)
  
  // Adjust start if we're near the end
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Edit dialog state
const editDialogOpen = ref(false)
const selectedAgent = ref<Agent | null>(null)

// Column definitions
const columns: ColumnDef<Agent>[] = [
  {
    id: 'select',
         header: ({ table }) => h(Checkbox, {
       'modelValue': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
       'onUpdate:modelValue': (value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(!!value),
       'ariaLabel': t('agencies.table.controls.selectAll'),
     }),
     cell: ({ row }) => h(Checkbox, {
       'modelValue': row.getIsSelected(),
       'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
       'ariaLabel': t('agencies.table.controls.selectRow'),
     }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        class: 'h-8 data-[state=open]:bg-accent'
      }, () => [t('agencies.table.columns.name'), h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'font-medium' }, row.getValue('name')),
  },
  {
    accessorKey: 'phone',
    header: () => t('agencies.table.columns.phone'),
    cell: ({ row }) => h('div', { class: 'font-mono text-sm' }, row.getValue('phone')),
  },
  {
    accessorKey: 'address',
    header: () => t('agencies.table.columns.address'),
    cell: ({ row }) => h('div', { class: 'truncate' }, row.getValue('address')),
  },
  {
    accessorKey: 'joinDate',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        class: 'h-8 data-[state=open]:bg-accent'
      }, () => [t('agencies.table.columns.joinDate'), h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('joinDate'))
      return h('div', {}, date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }))
    },
  },
  {
    accessorKey: 'propertiesCount',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        class: 'h-8 data-[state=open]:bg-accent w-full justify-end'
      }, () => [t('agencies.table.columns.properties'), h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'font-medium text-right [dir="rtl"]:text-left' }, row.getValue('propertiesCount')),
  },
  {
    accessorKey: 'branchesCount',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        class: 'h-8 data-[state=open]:bg-accent w-full justify-end'
      }, () => [t('agencies.table.columns.branches'), h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'text-right [dir="rtl"]:text-left' }, row.getValue('branchesCount')),
  },
  {
    accessorKey: 'employeesCount',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        class: 'h-8 data-[state=open]:bg-accent w-full justify-end'
      }, () => [t('agencies.table.columns.employees'), h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'text-right [dir="rtl"]:text-left' }, row.getValue('employeesCount')),
  },
  {
    accessorKey: 'subscriptionTotal',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        class: 'h-8 data-[state=open]:bg-accent w-full justify-end'
      }, () => [t('agencies.table.columns.subscription'), h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => {
      const amount = row.getValue('subscriptionTotal') as number
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)
      return h('div', { class: 'font-semibold text-primary text-right [dir="rtl"]:text-left' }, formatted)
    },
  },
  {
    accessorKey: 'status',
    header: () => t('agencies.table.columns.status'),
         cell: ({ row }) => h(StatusBadge, { status: row.getValue('status') as 'active' | 'pending' | 'refused' }),
  },
]

// Table state
const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})

const rowSelection = ref({})

const table = useVueTable({
  data: computed(() => props.agents),
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
  },
})

// Helper function to get translated column names
function getColumnDisplayName(columnId: string): string {
  const columnNameKey = `agencies.table.columnNames.${columnId}` as const
  return t(columnNameKey)
}

// Action handlers
function viewProfile(agent: Agent) {
  // Navigate to agent profile page
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
  // Navigate to agent properties page
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

// Handle cell clicks to prevent dropdown on interactive elements
function handleCellClick(columnId: string, event: Event) {
  // Prevent dropdown from opening when clicking on checkbox or other interactive elements
  if (columnId === 'select') {
    event.stopPropagation()
  }
}
</script>

<style scoped>
/* RTL Table Support */
[dir="rtl"] .table-modern {
  direction: rtl;
}

[dir="rtl"] .table-modern th,
[dir="rtl"] .table-modern td {
  text-align: right;
}

[dir="rtl"] .table-modern th:first-child,
[dir="rtl"] .table-modern td:first-child {
  text-align: right;
}

[dir="rtl"] .table-modern th:last-child,
[dir="rtl"] .table-modern td:last-child {
  text-align: left;
}

/* RTL Dropdown menu adjustments */
[dir="rtl"] .dropdown-content {
  right: 0;
  left: auto;
}





/* Center align checkbox and actions column content */
.table-modern td:first-child,
.table-modern th:first-child {
  text-align: center;
  width: fit-content;
  white-space: nowrap;
}

.table-modern td:last-child,
.table-modern th:last-child {
  text-align: center;
}

/* Center the checkbox elements specifically */
[data-slot="table-cell"]:has([data-slot="checkbox"]) {
  text-align: center;
  width: 1%;
  min-width: 50px;
}

/* Center the action dropdown buttons */
[data-slot="table-cell"]:has([data-slot="dropdown-menu-trigger"]) {
  text-align: center;
}

/* Override RTL center alignment for first/last columns */
[dir="rtl"] .table-modern th:first-child,
[dir="rtl"] .table-modern td:first-child {
  text-align: center;
}

[dir="rtl"] .table-modern th:last-child,
[dir="rtl"] .table-modern td:last-child {
  text-align: center;
}
</style> 