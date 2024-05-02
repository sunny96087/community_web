<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

import type { apiResponse } from '~/models'
import { showToast, openDialog, showLoading, hideLoading } from '~/store/eventBus'
import { APIStore } from '~/store/apiService'
const store = APIStore()
const postContent = ref('')
const imageLink: any = ref('')
// const userId = ref('6628b9f165bbf2c7e34ed7cb')

const postContentError = ref('')
// const imageLinkError = ref('')

function checkPostContent() {
  if (!postContent.value.trim()) {
    postContentError.value = '貼文內容不得為空'
  } else {
    postContentError.value = ''
  }
}

async function savePost() {
  console.log(postContent.value, imageLink.value, store.userInfo.id)

  let data = {
    content: postContent.value,
    image: imageLink.value
  }

  // 送出
  try {
    showLoading()
    const res = (await store.apiAddPost(data)) as apiResponse
    const result = res.data
    console.log(`editEvent result = ${JSON.stringify(result)}`)
    if (result.status === 'success') {
      console.log('新增貼文成功')

      // 清空頁面
      reset()

      // 提示成功
      showToast('新增貼文成功')
    } else {
      console.log('新增貼文失敗')
      showToast('新增貼文失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

function reset() {
  postContent.value = ''
  imageLink.value = ''
}

// 上傳圖片
// 參考元素
const fileInput: any = ref(null)

// 觸發文件上傳
function triggerFileUpload() {
  fileInput.value?.click()
}

// 處理文件上傳
async function handleFileUpload(event: any) {
  const file = event.target.files[0]
  if (!file) return

  const formData: any = new FormData()
  formData.append('file', file)

  // 送出
  try {
    showLoading()
    const res = await store.apiUploadImage(formData)
    const result = res.data
    console.log(`editEvent result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      console.log('上傳圖片成功')

      imageLink.value = result.data.imgUrl

      // 提示成功
      showToast('上傳圖片成功')
    } else {
      console.log('上傳圖片失敗，系統錯誤')
      showToast('上傳圖片失敗')
    }
  } catch (e) {
    console.log(e)
    showToast('上傳圖片失敗，請換一張圖片')
  } finally {
    hideLoading()
  }
}
</script>

<template>
  <div class="">
    <!-- 張貼動態 -->
    <div class="relative mb-4 text-[20px] font-bold">
      <div class="border-2 border-black bg-white py-[18px] text-center">張貼動態</div>
      <div
        class="absolute inset-0 top-0 -translate-x-1 translate-y-1 transform border-2 border-black bg-white py-[18px] text-center"
      >
        張貼動態
      </div>
      <div class="absolute inset-0 border-2 border-black bg-white py-[18px] text-center">
        張貼動態
      </div>
    </div>
    <!-- post content -->
    <div class="custom-b-shadow custom-border-2 rounded-lg bg-white p-8">
      <label class="pb-4"
        >貼文內容
        <textarea
          v-model="postContent"
          type="text"
          class="custom-input min-h-[120px]"
          placeholder="輸入您的貼文內容"
          @blur="checkPostContent"
        ></textarea>
      </label>
      <div v-if="postContentError" class="mt-1 text-red-500">{{ postContentError }}</div>

      <label class="mt-4 block"
        >圖片連結
        <div class="flex flex-col gap-2 sm:flex-row">
          <input
            v-model="imageLink"
            type="text"
            class="custom-input"
            placeholder="圖片連結"
            disabled
            style="background: #eee"
          />

          <!-- 圖片上傳輸入框 -->
          <input type="file" @change="handleFileUpload" ref="fileInput" style="display: none" />
          <!-- 上傳圖片按鈕 -->
          <button @click="triggerFileUpload" class="custom-btn-secondary w-[120px] min-w-[120px]">
            上傳圖片
          </button>
        </div>
      </label>

      <div class="custom-border-2 mt-4 w-full rounded-lg" v-if="imageLink">
        <img :src="imageLink" alt="連結錯誤，無法預覽圖片" class="pic-auto" />
      </div>

      <div class="flex justify-center">
        <button v-if="postContent" @click="savePost" class="custom-btn-secondary mt-8 w-[60%]">
          送出貼文
        </button>
        <button v-else class="custom-btn-disabled mt-8 w-[60%]" disabled>送出貼文</button>
      </div>
    </div>
  </div>
</template>
