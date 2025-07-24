<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="sm:max-w-[800px]">
      <DialogHeader>
        <DialogTitle>{{ $t('agencies.editDialog.title') }}</DialogTitle>
        <DialogDescription>
          {{ $t('agencies.editDialog.description') }}
        </DialogDescription>
      </DialogHeader>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Name Field -->
        <div class="space-y-2">
          <Label for="name">{{ $t('agencies.editDialog.fields.name') }}</Label>
          <Input
            id="name"
            v-model="formData.name"
            :placeholder="$t('agencies.editDialog.placeholders.name')"
            required
          />
        </div>

        <!-- Phone Field -->
        <div class="space-y-2">
          <Label for="phone">{{ $t('agencies.editDialog.fields.phone') }}</Label>
          <Input
            id="phone"
            v-model="formData.phone"
            type="tel"
            :placeholder="$t('agencies.editDialog.placeholders.phone')"
            required
          />
        </div>

        <!-- Address Field -->
        <div class="space-y-2">
          <Label for="address">{{ $t('agencies.editDialog.fields.address') }}</Label>
          <Input
            id="address"
            v-model="formData.address"
            :placeholder="$t('agencies.editDialog.placeholders.address')"
            required
          />
        </div>

        <!-- Properties Count -->
        <div class="space-y-2">
          <Label for="propertiesCount">{{ $t('agencies.editDialog.fields.properties') }}</Label>
          <Input
            id="propertiesCount"
            v-model.number="formData.propertiesCount"
            type="number"
            min="0"
            :placeholder="$t('agencies.editDialog.placeholders.properties')"
          />
        </div>

        <!-- Branches Count -->
        <div class="space-y-2">
          <Label for="branchesCount">{{ $t('agencies.editDialog.fields.branches') }}</Label>
          <Input
            id="branchesCount"
            v-model.number="formData.branchesCount"
            type="number"
            min="0"
            :placeholder="$t('agencies.editDialog.placeholders.branches')"
          />
        </div>

        <!-- Employees Count -->
        <div class="space-y-2">
          <Label for="employeesCount">{{ $t('agencies.editDialog.fields.employees') }}</Label>
          <Input
            id="employeesCount"
            v-model.number="formData.employeesCount"
            type="number"
            min="0"
            :placeholder="$t('agencies.editDialog.placeholders.employees')"
          />
        </div>

        <!-- Subscription Total -->
        <div class="space-y-2">
          <Label for="subscriptionTotal">{{ $t('agencies.editDialog.fields.subscription') }}</Label>
          <Input
            id="subscriptionTotal"
            v-model.number="formData.subscriptionTotal"
            type="number"
            min="0"
            step="0.01"
            :placeholder="$t('agencies.editDialog.placeholders.subscription')"
          />
        </div>

        <!-- Status Field -->
        <div class="space-y-2">
          <Label for="status">{{ $t('agencies.editDialog.fields.status') }}</Label>
          <Select v-model="formData.status">
            <SelectTrigger>
              <SelectValue :placeholder="$t('agencies.editDialog.placeholders.status')" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">{{ $t('agencies.table.filters.active') }}</SelectItem>
              <SelectItem value="pending">{{ $t('agencies.table.filters.pending') }}</SelectItem>
              <SelectItem value="refused">{{ $t('agencies.table.filters.refused') }}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" @click="$emit('update:open', false)">
            {{ $t('agencies.editDialog.actions.cancel') }}
          </Button>
          <Button type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? $t('agencies.editDialog.actions.saving') : $t('agencies.editDialog.actions.save') }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Agent } from '@/types/agent'
import { agentsService } from '@/services/agentsService'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props {
  open: boolean
  agent: Agent | null
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'agentUpdated', agent: Agent): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { t } = useI18n()

const isSubmitting = ref(false)

// Form data
const formData = ref<Partial<Agent>>({
  name: '',
  phone: '',
  address: '',
  propertiesCount: 0,
  branchesCount: 0,
  employeesCount: 0,
  subscriptionTotal: 0,
  status: 'active',
})

// Watch for agent changes to populate form
watch(() => props.agent, (newAgent) => {
  if (newAgent) {
    formData.value = {
      id: newAgent.id,
      name: newAgent.name,
      phone: newAgent.phone,
      address: newAgent.address,
      propertiesCount: newAgent.propertiesCount,
      branchesCount: newAgent.branchesCount,
      employeesCount: newAgent.employeesCount,
      subscriptionTotal: newAgent.subscriptionTotal,
      status: newAgent.status,
      joinDate: newAgent.joinDate,
    }
  }
}, { immediate: true })

async function handleSubmit() {
  if (!props.agent || !formData.value.id) return

  isSubmitting.value = true
  
  try {
    const updatedAgent = await agentsService.updateAgent(formData.value.id, formData.value)
    if (updatedAgent) {
      emit('agentUpdated', updatedAgent)
      emit('update:open', false)
    }
  } catch (error) {
    console.error('Error updating agent:', error)
    // In a real app, you'd show a toast or error message here
  } finally {
    isSubmitting.value = false
  }
}
</script> 