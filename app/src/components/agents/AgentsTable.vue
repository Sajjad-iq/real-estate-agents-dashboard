<template>
  <div class="w-full space-y-4">
    <!-- Table Controls -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <Input
          placeholder="Filter agents..."
          :model-value="(table.getColumn('name')?.getFilterValue() as string) ?? ''"
          @update:model-value="table.getColumn('name')?.setFilterValue($event)"
          class="max-w-sm form-control"
        />
      </div>
      
      <div class="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" class="btn-secondary">
              Columns <ChevronDown class="ml-2 h-4 w-4" />
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
              {{ column.id }}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <!-- Data Table -->
    <div class="card-enhanced rounded-md border">
      <Table class="table-modern">
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
              class="hover:bg-primary/2 transition-colors"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>
          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No agents found.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between space-x-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} agent(s) selected.
      </div>
      <div class="flex items-center space-x-2">
        <p class="text-sm font-medium">Rows per page</p>
                 <select
           :value="table.getState().pagination.pageSize"
           @change="table.setPageSize(Number(($event.target as HTMLSelectElement).value))"
           class="h-8 w-[70px] rounded border border-input bg-background text-sm"
         >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
      </div>
      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          Next
        </Button>
      </div>
    </div>
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
import { ArrowUpDown, ChevronDown, MoreHorizontal, User, Edit, Building, MessageCircle, Trash2 } from 'lucide-vue-next'
import { h, ref, computed } from 'vue'
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
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import type { Agent } from '@/types/agent'
import { agentsService } from '@/services/agentsService'

interface Props {
  agents: Agent[]
}

interface Emits {
  (e: 'agentDeleted', agentId: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Column definitions
const columns: ColumnDef<Agent>[] = [
  {
    id: 'select',
         header: ({ table }) => h(Checkbox, {
       'modelValue': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
       'onUpdate:modelValue': (value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(!!value),
       'ariaLabel': 'Select all',
     }),
     cell: ({ row }) => h(Checkbox, {
       'modelValue': row.getIsSelected(),
       'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
       'ariaLabel': 'Select row',
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
      }, () => ['Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'font-medium' }, row.getValue('name')),
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => h('div', { class: 'font-mono text-sm' }, row.getValue('phone')),
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => h('div', { class: 'max-w-[200px] truncate' }, row.getValue('address')),
  },
  {
    accessorKey: 'joinDate',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        class: 'h-8 data-[state=open]:bg-accent'
      }, () => ['Join Date', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
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
      }, () => ['Properties', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'text-right font-medium' }, row.getValue('propertiesCount')),
  },
  {
    accessorKey: 'branchesCount',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        class: 'h-8 data-[state=open]:bg-accent w-full justify-end'
      }, () => ['Branches', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'text-right' }, row.getValue('branchesCount')),
  },
  {
    accessorKey: 'employeesCount',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        class: 'h-8 data-[state=open]:bg-accent w-full justify-end'
      }, () => ['Employees', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'text-right' }, row.getValue('employeesCount')),
  },
  {
    accessorKey: 'subscriptionTotal',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        class: 'h-8 data-[state=open]:bg-accent w-full justify-end'
      }, () => ['Subscription', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => {
      const amount = row.getValue('subscriptionTotal') as number
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)
      return h('div', { class: 'text-right font-semibold text-primary' }, formatted)
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
         cell: ({ row }) => h(StatusBadge, { status: row.getValue('status') as 'active' | 'pending' | 'refused' }),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const agent = row.original

      return h(DropdownMenu, {}, {
        default: () => [
          h(DropdownMenuTrigger, { asChild: true }, {
            default: () => h(Button, { variant: 'ghost', class: 'h-8 w-8 p-0' }, {
              default: () => [
                h('span', { class: 'sr-only' }, 'Open menu'),
                h(MoreHorizontal, { class: 'h-4 w-4' })
              ]
            })
          }),
          h(DropdownMenuContent, { align: 'end' }, {
            default: () => [
              h(DropdownMenuLabel, {}, 'Actions'),
              h(DropdownMenuItem, { 
                onClick: () => viewProfile(agent)
              }, {
                default: () => [
                  h(User, { class: 'mr-2 h-4 w-4' }),
                  'View Profile'
                ]
              }),
              h(DropdownMenuItem, { 
                onClick: () => editProfile(agent)
              }, {
                default: () => [
                  h(Edit, { class: 'mr-2 h-4 w-4' }),
                  'Edit Profile'
                ]
              }),
              h(DropdownMenuItem, { 
                onClick: () => viewProperties(agent)
              }, {
                default: () => [
                  h(Building, { class: 'mr-2 h-4 w-4' }),
                  'View Properties'
                ]
              }),
              h(DropdownMenuItem, { 
                onClick: () => sendWhatsApp(agent)
              }, {
                default: () => [
                  h(MessageCircle, { class: 'mr-2 h-4 w-4' }),
                  'Send WhatsApp'
                ]
              }),
              h(DropdownMenuSeparator),
              h(DropdownMenuItem, { 
                onClick: () => deleteAgent(agent),
                class: 'text-red-600 focus:text-red-600'
              }, {
                default: () => [
                  h(Trash2, { class: 'mr-2 h-4 w-4' }),
                  'Delete Agent'
                ]
              }),
            ]
          })
        ]
      })
    },
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

// Action handlers
function viewProfile(agent: Agent) {
  alert(`Viewing profile for ${agent.name}`)
}

function editProfile(agent: Agent) {
  alert(`Editing profile for ${agent.name}`)
}

function viewProperties(agent: Agent) {
  alert(`Viewing properties for ${agent.name} (${agent.propertiesCount} properties)`)
}

function sendWhatsApp(agent: Agent) {
  const whatsappUrl = agentsService.getWhatsAppLink(agent.phone)
  window.open(whatsappUrl, '_blank')
}

async function deleteAgent(agent: Agent) {
  if (confirm(`Are you sure you want to delete ${agent.name}?`)) {
    const success = await agentsService.deleteAgent(agent.id)
    if (success) {
      emit('agentDeleted', agent.id)
    }
  }
}
</script> 