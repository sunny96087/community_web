<template>
  <div class="">
    <!-- 張貼動態 -->
    <div class="relative mb-4 text-[20px]">
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
        ></textarea>
      </label>

      <label class="mt-4 block"
        >圖片連結
        <input
          v-model="imageLink"
          type="text"
          class="custom-input"
          placeholder="輸入您的圖片連結"
        />
      </label>

      <div class="custom-border-2 mt-4 w-full rounded-lg" v-if="imageLink">
        <img :src="imageLink" alt="pic" class="pic-auto" />
      </div>

      <div class="flex justify-center">
        <button @click="savePost" class="custom-btn-secondary mt-8 w-[60%]">送出貼文</button>
      </div>
    </div>
    <!-- <button class="">上傳圖片</button> -->
  </div>
</template>
<script setup lang="ts">
import type { apiResponse } from '~/models'
import { APIStore } from '~/store/apiService'
const store = APIStore()
const postContent = ref('')
const imageLink = ref('')
const userId = ref('6628b9f165bbf2c7e34ed7cb')

async function savePost() {
  console.log(postContent.value, imageLink.value, userId.value)

  let data = {
    content: postContent.value,
    image: imageLink.value,
    userId: userId.value
  }
  // 驗證圖片是不是 https 開頭

  // 驗證貼文內容是不是空

  // 送出
  try {
    const res = (await store.apiAddPost(data)) as apiResponse
    const result = res.data
    console.log(`editEvent result = ${JSON.stringify(result)}`)
    if(result.status === 'success') {
      console.log('新增貼文成功')

      // 清空頁面
      reset();

      // 提示成功
    } else {
      console.log('新增貼文失敗')
    }
  } catch (e) {
    console.log(e)
  }
}

function reset(){
  postContent.value = ''
  imageLink.value = ''
}
</script>
