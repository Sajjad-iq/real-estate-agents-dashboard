<template>
  <Badge :variant="badgeVariant" :class="badgeClass">
    {{ capitalizedStatus }}
  </Badge>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Badge } from '@/components/ui/badge';

interface Props {
  status: 'active' | 'pending' | 'refused';
}

const props = defineProps<Props>();

const badgeVariant = computed(() => {
  switch (props.status) {
    case 'active':
      return 'default';
    case 'pending':
      return 'secondary';
    case 'refused':
      return 'destructive';
    default:
      return 'default';
  }
});

const badgeClass = computed(() => {
  switch (props.status) {
    case 'active':
      return 'bg-teal-100 text-teal-800 hover:bg-teal-100 border-teal-200';
    case 'pending':
      return 'bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200';
    case 'refused':
      return 'bg-rose-100 text-rose-800 hover:bg-rose-100 border-rose-200';
    default:
      return '';
  }
});

const capitalizedStatus = computed(() => {
  return props.status.charAt(0).toUpperCase() + props.status.slice(1);
});
</script> 