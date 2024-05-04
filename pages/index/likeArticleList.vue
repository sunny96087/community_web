<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

import type { apiResponse } from '~/models'
import { APIStore } from '~/store/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/store/eventBus'
const router = useRouter()
import defaultAvatar from '~/assets/images/userPic.png'

// 取得使用者按讚文章列表
const list: any = ref([])

onMounted(() => {
  getUserLikePostList()
})

async function getUserLikePostList() {
  let data = store.userInfo.id

  try {
    showLoading()
    console.log(`data = ${JSON.stringify(data)}`)
    const res = await store.apiGetUserLikePost(data)
    const result = res.data
    console.log(`editEvent result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      list.value = result.data.likedPosts
      console.log(`list = ${JSON.stringify(list)}`)
    } else {
      console.log('取得使用者按讚文章列表失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// 按讚
async function likePost(articleId: String) {
  let data: any = {
    postId: articleId,
    userId: store.userInfo.id
  }

  try {
    showLoading()
    const res = (await store.apiLikePost(data)) as apiResponse
    const result = res.data
    console.log(`editEvent result = ${JSON.stringify(result)}`)
    if (result.status === 'success') {
      console.log(result.message)

      showToast(result.message)
      getUserLikePostList()

      // 提示成功
    } else {
      console.log('系統錯誤')
    }
  } catch (e) {
    console.log(e)
    showToast('系統錯誤')
  } finally {
    hideLoading()
  }
}
</script>
<template>
  <div class="">
    <!-- 我按讚的貼文 -->
    <div class="relative mb-4 text-[20px] font-bold">
      <div class="border-2 border-black bg-white py-[18px] text-center">我按讚的貼文</div>
      <div
        class="absolute inset-0 top-0 -translate-x-1 translate-y-1 transform border-2 border-black bg-white py-[18px] text-center"
      >
        我按讚的貼文
      </div>
      <div class="absolute inset-0 border-2 border-black bg-white py-[18px] text-center">
        我按讚的貼文
      </div>
    </div>
    <!-- like post list -->
    <div class="flex flex-col gap-4" v-if="list && list.length > 0">
      <div
        v-for="item in list"
        :key="item._id"
        class="custom-border-2 custom-b-shadow list-item-block flex gap-4 rounded-lg bg-white p-4"
      >
        <div class="custom-avatar-clear h-[40px] w-[40px] min-w-[40px]">
          <img :src="item.userId?.avatar || defaultAvatar" alt="avatar" class="pic-auto" />
        </div>
        <div class="flex grow flex-col md:flex-row">
          <div class="flex grow flex-col">
            <div class="list-item-name transform font-bold duration-200">
              {{ item.userId?.name || '使用者不存在' }}
            </div>
            <div class="text-gray-400">發文時間：{{ item.createdAt }}</div>
          </div>
          <!-- <div class="md:self-end">您已追蹤 90 天！</div> -->
          <div class="flex items-center gap-8 self-end md:self-auto">
            <div class="cursor-pointer text-center" @click="likePost(item._id)">
              <Icon name="material-symbols:thumb-up-outline" size="24" class="text-primary"></Icon>
              <div class="">取消</div>
            </div>
            <NuxtLink :to="`/otherWall/${item.userId?._id}`" class="text-center">
              <Icon
                name="material-symbols:arrow-circle-right-outline-rounded"
                size="24"
                class=""
              ></Icon>
              <div class="">查看</div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- like post list none -->
    <div class="flex flex-col gap-4" v-else>
      <div
        class="custom-border-2 custom-b-shadow list-item-block flex justify-center gap-4 rounded-lg bg-white p-4 text-gray-400"
      >
        目前沒有按讚文章！
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-item-block:hover .list-item-name {
  color: #03438d;
  text-decoration: underline;
}

/* 取消按讚 */
/* 前往查看貼文 */
</style>
