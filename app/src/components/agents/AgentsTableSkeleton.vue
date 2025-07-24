<template>
  <div class="w-full space-y-4">
    <!-- Table Controls Skeleton -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <Skeleton class="h-4 w-24" />
        <Skeleton class="h-8 w-[70px]" />
      </div>
      <Skeleton class="h-8 w-32" />
    </div>

    <!-- Table Skeleton -->
    <div class="card-enhanced rounded-md border w-full overflow-auto">
      <Table class="table-modern min-w-full w-full">
        <TableHeader>
          <TableRow>
            <TableHead v-for="i in 8" :key="i">
              <Skeleton class="h-4 w-full" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="i in 10" :key="i" class="hover:bg-primary/2">
            <TableCell v-for="j in 8" :key="j">
              <div v-if="j === 1" class="flex items-center space-x-3">
                <Skeleton class="w-10 h-10 rounded-full" />
                <div class="space-y-1">
                  <Skeleton class="h-4 w-32" />
                  <Skeleton class="h-3 w-24" />
                </div>
              </div>
              <div v-else-if="j === 2" class="space-y-1">
                <Skeleton class="h-3 w-20" />
                <Skeleton class="h-3 w-16" />
              </div>
              <div v-else-if="j === 3">
                <Skeleton class="h-6 w-16 rounded-full" />
              </div>
              <div v-else-if="j === 4 || j === 5">
                <Skeleton class="h-4 w-12" />
              </div>
              <div v-else-if="j === 6">
                <Skeleton class="h-4 w-20" />
              </div>
              <div v-else-if="j === 7">
                <Skeleton class="h-4 w-16" />
              </div>
              <div v-else>
                <Skeleton class="h-8 w-8" />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
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
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
</script> 