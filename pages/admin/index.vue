<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: 'is-admin'
})
</script>

<template>
  <main class="relative min-h-screen w-full">
    <admin-navbar />
    <div class="page-wrapper">
      <div class="grow">
        <!-- <NuxtPage class="custom-b-shadow mt-4 rounded-lg border-2 border-black bg-white"/> -->
        <NuxtPage />
      </div>
    </div>
  </main>
  <ToastTool />
</template>

<style scoped>
main {
  background: url('~/assets/images/bg.png') no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  font-family: 'Azeret Mono';
}

.page-wrapper {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  gap: 28px;
  padding: 40px 24px;
  padding-bottom: 60px;
  align-items: start;
}

</style>
