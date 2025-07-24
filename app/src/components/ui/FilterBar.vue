<template>
  <Card class="p-6 mb-6 card-enhanced">
    <div class="flex flex-col md:flex-row gap-4">
      <!-- Search Input -->
      <div class="flex-1">
        <Input
          v-model="searchValue"
          placeholder="Search by agency name or phone..."
          class="w-full form-control"
          @input="emitFilters"
        />
      </div>

      <!-- Status Filter -->
      <div class="w-full md:w-48">
        <Select v-model="statusValue" @update:model-value="emitFilters">
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="refused">Refused</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <!-- Date Range Filters -->
      <div class="flex gap-2">
        <Input
          v-model="dateFromValue"
          type="date"
          class="w-40 form-control"
          placeholder="From date"
          @input="emitFilters"
        />
        <Input
          v-model="dateToValue"
          type="date"
          class="w-40 form-control"
          placeholder="To date"
          @input="emitFilters"
        />
      </div>

      <!-- Clear Filters Button -->
      <Button variant="outline" @click="clearFilters" class="btn-secondary">
        Clear Filters
      </Button>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { AgentFilters } from '@/types/agent';

interface Props {
  modelValue?: AgentFilters;
}

interface Emits {
  (e: 'update:modelValue', value: AgentFilters): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const searchValue = ref(props.modelValue?.search || '');
const statusValue = ref(props.modelValue?.status || 'all');
const dateFromValue = ref(props.modelValue?.dateFrom || '');
const dateToValue = ref(props.modelValue?.dateTo || '');

function emitFilters() {
  const filters: AgentFilters = {
    search: searchValue.value || undefined,
    status: statusValue.value === 'all' ? undefined : statusValue.value as any,
    dateFrom: dateFromValue.value || undefined,
    dateTo: dateToValue.value || undefined,
  };
  
  emit('update:modelValue', filters);
}

function clearFilters() {
  searchValue.value = '';
  statusValue.value = 'all';
  dateFromValue.value = '';
  dateToValue.value = '';
  emitFilters();
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    searchValue.value = newValue.search || '';
    statusValue.value = newValue.status || 'all';
    dateFromValue.value = newValue.dateFrom || '';
    dateToValue.value = newValue.dateTo || '';
  }
}, { deep: true });
</script> 