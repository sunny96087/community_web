<template>
  <div>
    <NuxtPage />
    <!-- <navbar />
    <NuxtLayout>
      <Slidebar />
    </NuxtLayout> -->
    <ToastTool class="z-50" />
    <CustomDialog />
    <LoadingTool />
  </div>
</template>

<script setup>
useHead({
  title: '社群網站',
  titleTemplate: (title) => (title ? `${title} - MetaWall` : 'MetaWall'),
  htmlAttrs: {
    lang: 'zh-TW'
  },
  meta: [
    {
      name: 'description',
      content: '歡迎來到使用 Nuxt 3 開發的社群網站，本網站僅作為參加六角 Node.js 入門班學習使用'
    },
    { name: 'twitter:title', content: 'Nuxt 3 社群網站' },
    {
      name: 'twitter:description',
      content: '歡迎來到使用 Nuxt 3 開發的社群網站，本網站僅作為參加六角 Node.js 入門班學習使用'
    },
    { name: 'twitter:image', content: 'https://i.imgur.com/AVNujNC.png' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'MetaWall' },
    {
      name: 'google-site-verification',
      content: 'q3j8Fywtb4CR5wt7ksjQlMPHXEPnepbCW3tmO_dIMGQ'
    }
  ],
  link: [
    {
      rel: 'icon',
      href: '/post.png'
    }
  ]
})

// 添加 SEO 搜尋引擎最佳化相關的 Meta Tags
useSeoMeta({
  description: '歡迎來到使用 Nuxt 3 開發的社群網站，本網站僅作為參加六角 Node.js 入門班學習使用',
  ogTitle: 'Nuxt 3 社群網站',
  ogDescription: '歡迎來到使用 Nuxt 3 開發的社群網站，本網站僅作為參加六角 Node.js 入門班學習使用',
  ogUrl: 'https://community-web-4l2.pages.dev/',
  ogImage: 'https://i.imgur.com/AVNujNC.png',
  ogType: 'website',
  ogSiteName: 'MetaWall',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Nuxt 3 社群網站',
  twitterDescription:
    '歡迎來到使用 Nuxt 3 開發的社群網站，本網站僅作為參加六角 Node.js 入門班學習使用',
  twitterImage: 'https://i.imgur.com/AVNujNC.png'
})
</script>
