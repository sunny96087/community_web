<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

import type { apiResponse } from '~/models'
import { APIStore } from '~/store/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/store/eventBus'

const currentPostType = ref(0)
const postTypeOption = ['最新貼文', '熱門貼文', '最舊貼文']
const currentKeyword = ref('')
// const currentUser = ref('6628b9f165bbf2c7e34ed7cb')

const dropdownVisible = ref(false)

// 創建一個响應式屬性來存儲 postList
const postList: any = ref([])
import defaultAvatar from '~/assets/images/userPic.png'

// 創建一個响應式屬性來存儲留言內容
const commentContent = ref('')

// 取得使用者按讚文章列表
const likePostList: any = ref([])
const userData: any = ref([])

onMounted(() => {
  getUserData()
  loadPostData()
})

// 使用 watch 來監聽 currentPostType 的變化
watch(currentPostType, () => {
  getUserData()
  loadPostData()
})

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value
}

const selectOption = (index: number) => {
  currentPostType.value = index
  dropdownVisible.value = false
  console.log(`currentPostType.value = ${currentPostType.value}`)
}

async function loadPostData() {
  let currentSort = 'newest'
  if (currentPostType.value === 1) {
    currentSort = 'mostLiked'
  } else if (currentPostType.value === 2) {
    currentSort = 'oldest'
  }

  // console.log(`currentSort = ${currentSort}`)

  let data = {
    sort: currentSort,
    keyword: currentKeyword.value,
    userId: store.userInfo.id
  }
  console.log(data)

  try {
    showLoading()
    const res = (await store.apiGetPost(data)) as apiResponse
    const result = res.data
    // console.log(`editEvent result = ${JSON.stringify(result)}`)

    if (result.status === 'success') {
      // 提示成功
      console.log('取得貼文成功')

      // 把資料放到 list
      postList.value = result.data
      // console.log(`postList = ${JSON.stringify(postList.value)}`)
      if (postList.value.length <= 0) {
        showToast('沒有相關文章')
      } else {
        // showToast('取得貼文成功')
      }
    } else {
      console.log('取得貼文失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

async function getUserData() {
  try {
    showLoading()
    const res = await store.apiGetSpecifyUser()
    const result = res.data
    // console.log(`editEvent result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      userData.value = result.data
      likePostList.value = result.data.likedPosts
      console.log(`likePostList = ${JSON.stringify(likePostList.value)}`)
    } else {
      console.log('取得使用者資料失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// 檢查文章是否已被點讚
function isPostLiked(postId: string): boolean {
  return likePostList.value.includes(postId)
}

// 留言
const submitComment = async (articleId: String) => {
  // 在這裡處理留言的邏輯
  // 例如，將留言內容和文章 ID 一起發送到伺服器
  console.log(`提交留言：${commentContent.value}，文章 ID：${articleId}`)

  let data: any = {
    content: commentContent.value,
    postId: articleId,
    userId: store.userInfo.id
  }

  try {
    showLoading()
    const res = (await store.apiAddPostComment(data)) as apiResponse
    const result = res.data
    console.log(`editEvent result = ${JSON.stringify(result)}`)
    if (result.status === 'success') {
      console.log('新增留言成功')

      // 清空輸入框
      commentContent.value = ''
      loadPostData()

      // 提示成功
    } else {
      console.log('新增留言失敗')
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
      getUserData()
      loadPostData()

      // 提示成功
    } else {
      console.log('按讚失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}
</script>

<template>
  <div class="">
    <div class="flex gap-3">
      <!-- 貼文種類選擇 -->
      <div class="relative min-w-[128px]">
        <div class="custom-select" @click="toggleDropdown">
          {{ postTypeOption[currentPostType] }}
          <Icon name="material-symbols:keyboard-arrow-down" size="26"></Icon>
        </div>
        <div class="custom-select-options" v-if="dropdownVisible">
          <div
            class="option"
            :class="{ 'option-selected': index === currentPostType }"
            v-for="(option, index) in postTypeOption"
            :key="index"
            @click="selectOption(index)"
          >
            {{ option }}
          </div>
        </div>
      </div>

      <!-- 關鍵字查詢 -->
      <div class="custom-search-input grow">
        <input type="text" placeholder="搜尋貼文" v-model="currentKeyword" @keyup.enter="loadPostData" />
        <button @click="loadPostData">
          <Icon name="material-symbols:search" size="28"></Icon>
        </button>
      </div>
    </div>

    <!-- post list -->
    <div class="mt-4 flex flex-col gap-3" v-if="postList.length > 0">
      <!-- post -->
      <div
        v-for="item in postList"
        :key="item.id"
        class="rounded-lg border-2 border-black bg-white p-6"
      >
        <div class="flex items-center gap-4">
          <div class="h-[45px] w-[45px] overflow-hidden rounded-full border-2 border-black">
            <img :src="item.userId?.avatar || defaultAvatar" alt="pic" class="pic-auto" />
          </div>
          <div class="flex grow flex-col">
            <div class="font-bold">{{ item.userId?.name }}</div>
            <div class="text-[12px] text-gray-400">{{ item.createdAt }}</div>
          </div>
        </div>

        <div class="mt-4">
          {{ item.content }}
        </div>

        <div
          class="mt-4 flex max-h-[280px] items-center overflow-hidden rounded-lg border-2 border-black"
          v-if="item.image"
        >
          <img :src="item.image" alt="pic" class="pic-auto" />
        </div>

        <div class="mt-5">
          <div class="flex items-center gap-2" v-if="item.likes > 0">
            <Icon
              v-if="isPostLiked(item._id)"
              @click="likePost(item._id)"
              name="material-symbols:thumb-up-rounded"
              size="24"
              class="text-primary"
            ></Icon>
            <Icon
              v-else
              @click="likePost(item._id)"
              name="material-symbols:thumb-up-outline-rounded"
              size="24"
              class="text-primary"
            ></Icon>
            {{ item.likes }}
          </div>
          <div v-else class="flex items-center gap-2 text-gray-400">
            <Icon
              @click="likePost(item._id)"
              name="material-symbols:thumb-up-outline-rounded"
              size="24"
              class=""
            ></Icon>
            成為第一個按讚的朋友
          </div>
        </div>

        <div class="my-5 flex gap-2">
          <div class="avatar h-[40px] w-[40px] min-w-[40px]">
            <img :src="item.userId?.avatar || defaultAvatar" alt="avatar" class="pic-auto" />
          </div>

          <div class="custom-search-input h-[40px] grow">
            <input type="text" placeholder="留言..." v-model="commentContent" @keyup.enter="submitComment(item._id)" />
            <button class="w-[128px]" @click="submitComment(item._id)">留言</button>
          </div>
        </div>

        <!-- 留言列表 -->
        <div class="flex flex-col gap-4" v-if="item.comments.length > 0">
          <div v-for="comment in item.comments" class="flex gap-3 rounded-xl bg-gray-50 p-4">
            <div class="avatar h-[40px] w-[40px] min-w-[40px]">
              <img :src="item.userId?.avatar || defaultAvatar" alt="avatar" class="pic-auto" />
            </div>
            <div class="flex flex-col">
              <div class="">{{ comment.userId?.name || '查無此人' }}</div>
              <div class="text-[12px] text-gray-400">{{ comment.createdAt }}</div>
              <div class="mt-1">{{ comment.content }}</div>
            </div>
          </div>
          <!-- <div class="flex gap-3 rounded-xl bg-gray-50 p-4">
            <div class="avatar h-[40px] w-[40px]">
              <img src="~/assets/images/userPic.jpg" alt="avatar" class="pic-auto" />
            </div>
            <div class="flex flex-col">
              <div class="">Sunny</div>
              <div class="text-[12px] text-gray-400">2022/1/11 10:00</div>
              <div class="mt-1">真的～我已經準備冬眠了</div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <!-- v-else no post -->
    <div v-else class="custom-b-shadow mt-4 rounded-lg border-2 border-black bg-white">
      <div class="border-b-2 border-black">
        <div class="flex gap-[6px] p-5">
          <span
            class="h-2 w-2 rounded-full border border-gray-400"
            style="background-color: #de4b63"
          ></span>
          <span
            class="h-2 w-2 rounded-full border border-gray-400"
            style="background-color: #faa722"
          ></span>
          <span
            class="h-2 w-2 rounded-full border border-gray-400"
            style="background-color: #83c51d"
          ></span>
        </div>
      </div>
      <div class="py-8 text-center text-gray-400">暫時沒有貼文！</div>
    </div>
  </div>
</template>
