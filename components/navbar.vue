<template>
  <div class="sticky top-0 z-20 border-b-[3px] border-black bg-white py-3">
    <div class="relative m-auto flex max-w-[1200px] items-center justify-between px-6">
      <nuxtLink to="/" class="text-[26px] paytone-one-regular">MetaWall</nuxtLink>
      <div  @click="menu = !menu" class="flex gap-[10px] cursor-pointer">
        <div class="avatar h-[30px] w-[30px] overflow-hidden rounded-full border-2 border-black">
          <img src="~/assets/images/userPic.jpg" alt="avatar" class="pic-auto" />
        </div>
        <div class="border-b-2 border-black leading-[28px] font-bold">Member</div>
      </div>

      <!-- menu -->
      <div v-if="menu" 
        class="double-bg absolute right-4 top-[124%] inline-flex flex-col border-2 border-black bg-white"
      >
        <nuxtLink to="/myWall" class="menu-item border-b-2 border-black"
          >我的貼文牆</nuxtLink
        >
        <nuxtLink to="/profile" class="menu-item border-b-2 border-black"
          >個人資料</nuxtLink
        >
        <nuxtLink to="/addArticle" class="menu-item border-b-2 border-black lg:hidden"
          >張貼動態</nuxtLink
        >
        <nuxtLink to="/trackingList" class="menu-item border-b-2 border-black lg:hidden"
          >追蹤名單</nuxtLink
        >
        <nuxtLink to="/likeArticleList" class="menu-item border-b-2 border-black lg:hidden"
          >按讚文章</nuxtLink
        >
        <nuxtLink to="/login" class="menu-item">登出 </nuxtLink>

      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const menu = ref(false);
</script>

<style scoped>
.menu-item {
  @apply px-[52px] py-2 transform duration-300;
}

.menu-item:hover {
  background: #EFECE7;
}

.double-bg::after {
  @apply absolute h-[254px] lg:h-[128px] w-[188px] border-2 border-black bg-white left-[2px] top-[2px];
  content: '';
  z-index: -1;
}
</style>
