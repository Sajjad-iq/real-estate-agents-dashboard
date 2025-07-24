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
      return 'bg-green-100 text-green-800 hover:bg-green-100';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
    case 'refused':
      return 'bg-red-100 text-red-800 hover:bg-red-100';
    default:
      return '';
  }
});

const capitalizedStatus = computed(() => {
  return props.status.charAt(0).toUpperCase() + props.status.slice(1);
});
</script> 