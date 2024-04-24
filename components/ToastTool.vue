<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { toastMessage } from '~/store/eventBus'

const show = ref(false)

watchEffect(() => {
  if (toastMessage.value) {
    show.value = true
    setTimeout(() => {
      show.value = false
    }, 3000)
  }
})
</script>

<template>
  <div v-if="show" class="custom-toast">{{ toastMessage }}</div>
</template>

<style scoped>
.custom-toast {
  position: fixed;
  z-index: 1200;

  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;

  background-color: #bbb8f4d4;
  color: black;
  padding: 12px 16px;
  border-radius: 6px;
  box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.1);
}
</style>
