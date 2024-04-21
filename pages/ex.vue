<template>
    <IronManWelcome />
    <div class="m-6 bg-slate-50 py-24">
      <div class="flex flex-col items-center">
        <h1 class="text-6xl font-semibold text-sky-400">2023 iThome</h1>
        <p class="mt-4 text-9xl font-bold text-gray-600">鐵人賽</p>
      </div>
      <div class="flex flex-col items-center">
        <div class="my-4 flex space-x-4">
          <NuxtLink to="/about">前往 About</NuxtLink>
          <NuxtLink to="/contact">前往 Contact</NuxtLink>
          <NuxtLink to="/counter">前往 counter</NuxtLink>
          <NuxtLink to="/show">前往 show</NuxtLink>
        </div>
      </div>
    </div>
    <ClientOnly>
      <BaseApplyButton />
      <template #fallback>
        <p class="my-6 flex justify-center">[BaseApplyButton.vue] 元件載入中...</p>
      </template>
    </ClientOnly>
  
    <div class="flex flex-col items-center">
      <div class="mt-8 flex items-center">
        <input id="show-button" v-model="show" type="checkbox" class="h-5 w-5" />
        <label for="show-button" class="ml-2 block text-base text-slate-800">顯示報名按鈕</label>
      </div>
      <LazyBaseApplyRoundButton v-if="show" />
  
      <div class="flex flex-col items-center">
        <span class="mt-8 text-4xl text-gray-700">{{ count }}</span>
        <button
          class="my-6 rounded-sm bg-sky-600 px-4 py-2 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          @click="increment"
        >
          增加 1
        </button>
      </div>
      <div class="flex flex-col items-center">
        <Icon name="logos:nuxt" size="40" />
      </div>
    </div>
  </template>
  <script setup>
  
  const show = ref(false)
  
  const { count, increment } = useCounter()
  </script>
  