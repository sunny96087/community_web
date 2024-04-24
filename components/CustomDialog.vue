<script setup lang="ts">
import {
  dialogTitle,
  dialogMessage,
  showDialog,
  confirmDialog,
  cancelDialog
} from '~/store/eventBus'
</script>

<template>
  <div v-if="showDialog" class="custom-dialog-overlay">
    <div class="custom-dialog">
      <div class="custom-dialog-header">
        <h4>{{ dialogTitle }}</h4>
      </div>
      <div class="custom-dialog-body">
        <p>{{ dialogMessage }}</p>
      </div>
      <div class="custom-dialog-footer">
        <button @click="cancelDialog" class="btn btn-secondary">取消</button>
        <button @click="confirmDialog" class="btn btn-danger">確認</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-dialog-overlay {
  position: fixed;

  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1021;
}

.custom-dialog {
  background-color: #ffffff9e;
  backdrop-filter: blur(4px);
  max-width: 300px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.custom-dialog-header h3 {
  margin: 0;
}

.custom-dialog-body {
  margin-top: 20px;
}

.custom-dialog-footer {
  margin-top: 20px;
  text-align: right;
}

.custom-dialog-footer button {
  margin-left: 12px;
}
</style>
