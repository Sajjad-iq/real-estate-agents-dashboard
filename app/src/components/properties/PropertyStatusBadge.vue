<template>
  <span 
    class="px-2 py-1 text-xs font-medium rounded-full"
    :class="statusClasses"
  >
    {{ translatedStatus }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  status: 'available' | 'sold' | 'rented' | 'pending'
}

const props = defineProps<Props>()
const { t } = useI18n()

const translatedStatus = computed(() => {
  return t(`properties.statuses.${props.status}`)
})

const statusClasses = computed(() => {
  switch (props.status) {
    case 'available':
      return 'bg-green-100 text-green-800'
    case 'sold':
      return 'bg-red-100 text-red-800'
    case 'rented':
      return 'bg-blue-100 text-blue-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
})
</script> 