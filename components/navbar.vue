<script setup lang="ts">
import type { apiResponse } from '~/models'
import { APIStore } from '~/store/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/store/eventBus'
const router = useRouter()

const menu = ref(false)

// const isLoggedIn = ref(false)

function logout() {
  store.logout()
  router.push('/login')
}

// getUserInfo()
onMounted(() => {
  const userInfo = store.getUserInfoFromLocalStorage()
  console.log(userInfo)
  // 登入會有資料
  // 沒登入 = null

  if(userInfo){
    store.setUserInfo(userInfo)
  }
  
})
</script>

<template>
  <div class="sticky top-0 z-20 border-b-[3px] border-black bg-white py-3">
    <div class="relative m-auto flex max-w-[1200px] items-center justify-between px-6">
      <nuxtLink to="/" class="paytone-one-regular text-[26px]">MetaWall</nuxtLink>

      <div v-if="store.isLoggedIn" @click="menu = !menu" class="flex cursor-pointer gap-[10px]">
        <div class="avatar h-[30px] w-[30px]">
          <img src="~/assets/images/userPic.jpg" alt="avatar" class="pic-auto" />
        </div>

        <div class="border-b-2 border-black font-bold leading-[28px]">Member</div>
      </div>

      <nuxt-link v-else to="/login" class="text-primary font-bold leading-[28px]">登入</nuxt-link>
      <!-- menu -->
      <div
        v-if="menu"
        class="double-bg absolute right-4 top-[124%] inline-flex flex-col border-2 border-black bg-white"
      >
        <nuxtLink to="/myWall" class="menu-item border-b-2 border-black">我的貼文牆</nuxtLink>
        <nuxtLink to="/profile" class="menu-item border-b-2 border-black">個人資料</nuxtLink>
        <nuxtLink to="/addArticle" class="menu-item border-b-2 border-black lg:hidden"
          >張貼動態</nuxtLink
        >
        <nuxtLink to="/trackingList" class="menu-item border-b-2 border-black lg:hidden"
          >追蹤名單</nuxtLink
        >
        <nuxtLink to="/likeArticleList" class="menu-item border-b-2 border-black lg:hidden"
          >按讚文章</nuxtLink
        >
        <nuxtLink @click="logout" class="menu-item">登出 </nuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-item {
  @apply transform px-[52px] py-2 duration-300;
}

.menu-item:hover {
  background: #efece7;
}

.double-bg::after {
  @apply absolute left-[2px] top-[2px] h-[254px] w-[188px] border-2 border-black bg-white lg:h-[128px];
  content: '';
  z-index: -1;
}
</style>
