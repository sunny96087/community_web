<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

import defaultAvatar from '~/assets/images/userPic.png'
import { APIStore } from '~/store/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/store/eventBus'

const list = ref<any[]>([])

onMounted(() => {
  getUserFollowList()
})

async function getUserFollowList() {
  try {
    showLoading()
    const res: any = await store.apiGetUserFollowList()
    const result = res.data
    console.log(`getUserFollowList result = ${JSON.stringify(result)}`)
    if (result && result.statusCode == 200) {
      console.log('取得追蹤名單成功')
      list.value = result.data.following
      console.log(`list = ${JSON.stringify(list.value)}`)
    } else {
      console.log('取得追蹤名單失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// 計算追蹤時間與今天的差異
const calculateFollowingDays = (createdAt: string) => {
  const now = new Date()
  const followDate = new Date(createdAt)
  // 將兩個日期轉換為它們的數字時間戳表示
  const diffTime = Math.abs(now.getTime() - followDate.getTime())
  // 將差異從毫秒轉換為天數
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}
</script>

<template>
  <div class="">
    <!-- 追蹤名單 -->
    <div class="relative mb-4 text-[20px] font-bold">
      <div class="border-2 border-black bg-white py-[18px] text-center">追蹤名單</div>
      <div
        class="absolute inset-0 top-0 -translate-x-1 translate-y-1 transform border-2 border-black bg-white py-[18px] text-center"
      >
        追蹤名單
      </div>
      <div class="absolute inset-0 border-2 border-black bg-white py-[18px] text-center">
        追蹤名單
      </div>
    </div>
    <!-- tracking list -->
    <div class="flex flex-col gap-4" v-if="list.length > 0">
      <div
        v-for="item in list"
        :key="item.id"
        class="custom-border-2 custom-b-shadow list-item-block flex gap-4 rounded-lg bg-white p-4"
      >
        <div class="custom-avatar-clear h-[40px] w-[40px]">
          <img :src="item.userId.avatar || defaultAvatar" alt="avatar" class="pic-auto" />
        </div>
        <div class="flex grow flex-col md:flex-row">
          <div class="flex grow flex-col">
            <NuxtLink
              :to="`/otherWall/${item.userId.id}`"
              class="list-item-name transform font-bold duration-200"
            >
              {{ item.userId.name }}
            </NuxtLink>
            <div class="text-gray-400">追蹤時間：{{ item.createdAt }}</div>
            <!-- 2024-05-01 11:17 -->
          </div>
          <div class="md:self-end">您已追蹤 {{ calculateFollowingDays(item.createdAt) }} 天！</div>
        </div>
      </div>
    </div>

    <!-- tracking list none -->
    <div class="flex flex-col gap-4" v-else>
      <div
        class="custom-border-2 custom-b-shadow list-item-block flex justify-center gap-4 rounded-lg bg-white p-4 text-gray-400"
      >
        目前沒有追蹤！
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-item-block:hover .list-item-name {
  color: #03438d;
  text-decoration: underline;
}
</style>
