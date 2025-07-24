<template>
  <div class="w-full space-y-4">
    <!-- View Controls Skeleton -->
    <div class="flex items-center justify-end">
      <div class="flex items-center space-x-2">
        <Skeleton class="h-8 w-[70px]" />
        <Skeleton class="h-4 w-24" />
      </div>
    </div>

    <!-- Cards Grid Skeleton -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <Card v-for="i in 12" :key="i" class="p-4 border-2">
        <div class="space-y-3">
          <!-- Header with Avatar and Status -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center space-x-3 min-w-0 flex-1">
              <Skeleton class="w-12 h-12 rounded-full" />
              <div class="flex-1 min-w-0 space-y-1">
                <Skeleton class="h-4 w-32" />
                <Skeleton class="h-3 w-24" />
              </div>
            </div>
            <Skeleton class="h-6 w-16 rounded-full" />
          </div>

          <!-- Contact Info -->
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <Skeleton class="w-3 h-3" />
              <Skeleton class="h-3 w-28" />
            </div>
            <div class="flex items-center space-x-2">
              <Skeleton class="w-3 h-3" />
              <Skeleton class="h-3 w-20" />
            </div>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 gap-3 pt-2 border-t border-border">
            <div class="text-center space-y-1">
              <Skeleton class="h-6 w-8 mx-auto" />
              <Skeleton class="h-3 w-16 mx-auto" />
            </div>
            <div class="text-center space-y-1">
              <Skeleton class="h-6 w-8 mx-auto" />
              <Skeleton class="h-3 w-16 mx-auto" />
            </div>
          </div>

          <!-- Revenue -->
          <div class="bg-muted/50 rounded-lg p-3 text-center space-y-1">
            <Skeleton class="h-4 w-20 mx-auto" />
            <Skeleton class="h-3 w-12 mx-auto" />
          </div>

          <!-- Hover indicator placeholder -->
          <div class="text-center">
            <Skeleton class="h-3 w-24 mx-auto" />
          </div>
        </div>
      </Card>
    </div>

    <!-- Pagination Skeleton -->
    <div class="flex items-center justify-between">
      <Skeleton class="h-4 w-40" />
      <div class="flex items-center space-x-2">
        <Skeleton class="h-8 w-8" />
        <Skeleton class="h-8 w-8" />
        <Skeleton class="h-4 w-16" />
        <Skeleton class="h-8 w-8" />
        <Skeleton class="h-8 w-8" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'
</script> 