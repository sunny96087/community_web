<!-- error.vue -->
<script setup lang="ts">
const props = defineProps({
  error: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div>
    <h2>{{ error.statusCode }}</h2>
    <p>{{ error.message }}</p>
    <NuxtLink to="/">回首頁</NuxtLink>
  </div>
</template>

