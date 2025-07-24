<template>
  <div class="not-implemented">
    <div class="not-implemented-content">
      <div class="icon-container">
        <Construction class="icon" />
      </div>
      <h1 class="title">{{ $t('common.pageNotImplemented') }}</h1>
      <p class="description">{{ $t('common.pageNotImplementedDescription') }}</p>
      <button @click="goBack" class="back-button">
        <ArrowLeft class="button-icon" />
        {{ $t('common.goBack') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Construction, ArrowLeft } from 'lucide-vue-next'

const router = useRouter()

function goBack() {
  router.go(-1)
}
</script>

<style scoped>
.not-implemented {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 120px);
  padding: 2rem;
}

.not-implemented-content {
  text-align: center;
  max-width: 400px;
}

.icon-container {
  margin-bottom: 2rem;
}

.icon {
  width: 4rem;
  height: 4rem;
  color: #94a3b8;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
}

.description {
  color: #64748b;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #0ea5e9;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: #0284c7;
}

.button-icon {
  width: 1rem;
  height: 1rem;
}

/* RTL Support */
[dir="rtl"] .back-button {
  flex-direction: row-reverse;
}
</style> 