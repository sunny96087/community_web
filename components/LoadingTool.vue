<script setup lang="ts">
import { isLoading } from '~/store/eventBus'
</script>

<template>
  <div>
    <div v-if="isLoading" class="spinner-container">
      <div class=" text-primary">
        <span class="">Loading...</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.spinner-container {
  position: fixed;
  inset: 0;
  z-index: 1300;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee3fe36;
}

.spinner-container {
 position: fixed;
 inset: 0;
 z-index: 1300;
 display: flex;
 justify-content: center;
 align-items: center;
 background-color: #03438d36;
}

.text-primary {
 color: #03438d !important;
 animation: textJump 1s infinite;
}

@keyframes textJump {
  0% { opacity: 1; transform: translateY(0); }
  50% { opacity: 0.5; transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(0); }
}
</style>
