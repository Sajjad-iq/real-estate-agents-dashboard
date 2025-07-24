<template>
  <div class="w-full space-y-6">
    <!-- Page Header Skeleton -->
    <div class="flex items-center justify-between">
      <div>
        <Skeleton class="h-8 w-48 mb-2" />
        <Skeleton class="h-5 w-64" />
      </div>
      <Skeleton class="h-9 w-20" />
    </div>

    <!-- Agent Info Card Skeleton -->
    <Card class="p-6">
      <div class="flex items-center gap-4">
        <Skeleton class="w-16 h-16 rounded-full" />
        <div class="space-y-2">
          <Skeleton class="h-6 w-32" />
          <Skeleton class="h-4 w-48" />
          <div class="flex items-center gap-4">
            <Skeleton class="h-4 w-24" />
            <Skeleton class="h-4 w-32" />
          </div>
        </div>
      </div>
    </Card>

    <!-- Properties Table Skeleton -->
    <Card class="overflow-hidden">
      <div class="overflow-auto">
        <Table class="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead v-for="i in 10" :key="i">
                <Skeleton class="h-4 w-full" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="i in 8" :key="i" class="hover:bg-gray-50">
              <TableCell>
                <!-- Property Image -->
                <Skeleton class="w-16 h-16 rounded-lg" />
              </TableCell>
              <TableCell>
                <!-- Title and ID -->
                <div class="space-y-1">
                  <Skeleton class="h-4 w-32" />
                  <Skeleton class="h-3 w-20" />
                </div>
              </TableCell>
              <TableCell>
                <!-- Type Badge -->
                <Skeleton class="h-6 w-16 rounded-full" />
              </TableCell>
              <TableCell>
                <!-- Location -->
                <div class="flex items-center gap-1">
                  <Skeleton class="w-4 h-4" />
                  <Skeleton class="h-4 w-24" />
                </div>
              </TableCell>
              <TableCell>
                <!-- Price -->
                <Skeleton class="h-4 w-20" />
              </TableCell>
              <TableCell>
                <!-- Bedrooms -->
                <div class="flex items-center gap-1">
                  <Skeleton class="w-4 h-4" />
                  <Skeleton class="h-4 w-6" />
                </div>
              </TableCell>
              <TableCell>
                <!-- Bathrooms -->
                <div class="flex items-center gap-1">
                  <Skeleton class="w-4 h-4" />
                  <Skeleton class="h-4 w-6" />
                </div>
              </TableCell>
              <TableCell>
                <!-- Area -->
                <Skeleton class="h-4 w-16" />
              </TableCell>
              <TableCell>
                <!-- Status -->
                <Skeleton class="h-6 w-16 rounded-full" />
              </TableCell>
              <TableCell>
                <!-- Actions -->
                <Skeleton class="h-8 w-8" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
</script> 