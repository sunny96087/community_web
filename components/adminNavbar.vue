<script setup lang="ts">
import type { apiResponse } from '~/models'
import { APIStore } from '~/store/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/store/eventBus'
const router = useRouter()
import defaultAvatar from '~/assets/images/userPic.png'

const menu = ref(false)

// const isLoggedIn = ref(false)

// BUG 使用者資料更新後沒辦法即時更新

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

  if (userInfo) {
    store.setUserInfo(userInfo)
  }
})
</script>

<template>
  <div class="sticky top-0 z-20 border-b-[3px] border-black bg-white py-3">
    <div class="relative m-auto flex max-w-[1200px] items-center justify-between px-6">
      <nuxtLink to="/" class="paytone-one-regular text-[26px]">Chat! Admin</nuxtLink>

      <div class="flex items-center justify-center gap-4">
        <nuxtLink to="/" class="border-b-2 border-black font-bold leading-[28px] hidden sm:block">回前台</nuxtLink>

        <!-- member -->
        <div v-if="store.isLoggedIn" @click="menu = !menu" class="flex cursor-pointer gap-[10px]">
          <div class="avatar h-[30px] w-[30px]">
            <img :src="store.userInfo?.avatar || defaultAvatar" alt="avatar" class="pic-auto" />
          </div>

          <div class="border-b-2 border-black font-bold leading-[28px]">
            {{ store.userInfo?.name || 'Admin' }}
          </div>
        </div>
        <!-- member menu -->
        <div
          v-if="menu"
          class="double-bg absolute right-4 top-[124%] inline-flex flex-col border-2 border-black bg-white"
        >
          <nuxtLink to="/admin/" class="menu-item border-b-2 border-black">公告</nuxtLink>
          <nuxtLink to="/admin/test" class="menu-item border-b-2 border-black">測試</nuxtLink>
          <nuxtLink to="/" class="menu-item border-b-2 border-black">回前台</nuxtLink>
          <nuxtLink @click="logout" class="menu-item">登出 </nuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-item {
  @apply transform px-[52px] py-2 duration-300;
}

.link-active {
  color: #03438d;
  border-color: #03438d;
}

.menu-item:hover {
  background: #efece7;
}

.double-bg::after {
  @apply absolute left-[2px] top-[2px] h-[170px] w-[156px] border-2 border-black bg-white;
  content: '';
  z-index: -1;
}
</style>
