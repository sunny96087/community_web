<template>
  <div>
    <NuxtPage />
    <!-- <navbar />
    <NuxtLayout>
      <Slidebar />
    </NuxtLayout> -->
  </div>
</template>


<script setup>
useHead({
  title: '社群網站',
  titleTemplate: (title) => (title ? `${title} - 社群網站` : '社群網站'),
  htmlAttrs: {
    lang: 'zh-TW'
  },
  link: [
    {
      rel: 'icon',
      href: '/favicon.ico'
    }
  ]
})

// 添加 SEO 搜尋引擎最佳化相關的 Meta Tags
useSeoMeta({
  description: '歡迎來到使用 Nuxt 3 開發的社群網站',
  ogTitle: 'Nuxt 3 社群網站',
  ogDescription: '歡迎來到使用 Nuxt 3 開發的社群網站',
  ogUrl: 'http://localhost:3000/',
  ogImage: 'https://i.imgur.com/AVNujNC.png'
})
</script>
