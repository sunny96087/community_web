<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

import type { apiResponse } from '~/models'
import { showToast, openDialog, showLoading, hideLoading } from '~/store/eventBus'
import { APIStore } from '~/store/apiService'
const store = APIStore()
import defaultAvatar from '~/assets/images/userPic.png'

const userData: any = ref([])
const newPassword = ref('')
const newConfirmPassword = ref('')

const tab = ref(1)

onMounted(() => {
  getUserData()
})

// 取使用者資料
async function getUserData() {
  try {
    showLoading()
    const res = await store.apiGetSpecifyUser()
    const result = res.data
    console.log(`editEvent result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      userData.value = result.data
      console.log(`userData = ${JSON.stringify(userData.value)}`)
    } else {
      console.log('取得使用者資料失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// 更新使用者資料
async function updateUser() {
  let data = {
    name: userData.value.name,
    avatar: userData.value.avatar,
    gender: Number(userData.value.gender)
  }

  try {
    showLoading()
    const res = await store.apiUpdateUser(data)
    const result = res.data
    // console.log(`editEvent result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      console.log('更新使用者資料成功')

      showToast('更新資料成功')

      // 更新 localStorage 中的資料
      // 使用 getUserInfoFromLocalStorage 方法取得當前的使用者資料
      const currentUserData = store.getUserInfoFromLocalStorage()

      if (currentUserData) {
        // 更新 name 和 avatar 的值
        currentUserData.name = userData.value.name
        currentUserData.avatar = userData.value.avatar

        // 將更新後的資料儲存回 localStorage
        store.saveUserDataToLocalStorage(currentUserData)
      } else {
        // 如果 localStorage 中沒有使用者資料，則處理錯誤或設置預設值
        console.log('沒有找到使用者資料')
      }

      // 頁面刷新 重新取得 localStorage 中的資料 -> 母湯 會把 store 洗掉
      // location.reload()
    } else {
      console.log('更新使用者資料失敗')
    }
  } catch (e: any) {
    console.log(e.response.data.message)
    showToast(e.response.data.message)
  } finally {
    hideLoading()
  }
}

// 更新使用者密碼
async function updateUserPassword() {
  if (newPassword.value !== newConfirmPassword.value) {
    showToast('新密碼與確認密碼不相符')
    return
  }
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/
  if (newPassword.value.length < 8 || !passwordRegex.test(newPassword.value)) {
    showToast('密碼要大於 8 碼且包含英文與數字')
    return
  }
  let data = {
    password: newPassword.value,
    confirmPassword: newConfirmPassword.value
  }

  try {
    showLoading()
    const res = await store.apiUpdatePassword(data)
    const result = res.data
    console.log(`editEvent result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      showToast('更新密碼成功')

      newPassword.value = ''
      newConfirmPassword.value = ''
    } else {
      showToast('更新密碼失敗')
    }
  } catch (e) {
    console.log(e.response.data.message)
    showToast(e.response.data.message)
  } finally {
    hideLoading()
  }
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

      userData.value.avatar = result.data.imgUrl

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
    <!-- 修改個人資料 -->
    <div class="relative mb-4 text-[20px] font-bold">
      <div class="border-2 border-black bg-white py-[18px] text-center">修改個人資料</div>
      <div
        class="absolute inset-0 top-0 -translate-x-1 translate-y-1 transform border-2 border-black bg-white py-[18px] text-center"
      >
        修改個人資料
      </div>
      <div class="absolute inset-0 border-2 border-black bg-white py-[18px] text-center">
        修改個人資料
      </div>
    </div>
    <!-- tab -->
    <div class="flex cursor-pointer pl-4">
      <div class="custom-tab" @click="tab = 1" :class="{ act: tab === 1 }">暱稱修改</div>
      <div class="custom-tab" @click="tab = 2" :class="{ act: tab === 2 }">重設密碼</div>
    </div>
    <!-- 暱稱修改 -->
    <div
      v-if="tab === 1"
      class="custom-border-2 custom-b-shadow list-item-block flex flex-col items-center rounded-lg bg-white px-[102px] py-8"
    >
      <div class="avatar h-[108px] w-[108px]">
        <img :src="userData.avatar || defaultAvatar" alt="avatar" class="pic-auto" />
      </div>
      <!-- 圖片上傳輸入框 -->
      <input type="file" @change="handleFileUpload" ref="fileInput" style="display: none" />
      <button @click="triggerFileUpload" class="mt-5 bg-black px-6 py-1 text-white">
        上傳大頭照
      </button>

      <label class="mb-4 w-full"
        >暱稱
        <input
          v-model="userData.name"
          type="text"
          class="custom-input h-[120px]"
          placeholder="暱稱"
        />
      </label>

      <label class="w-full"
        >性別
        <div class="flex gap-4">
          <label class="flex items-center gap-2">
            <input type="radio" v-model="userData.gender" value="1" />男
          </label>
          <label class="flex items-center gap-2">
            <input type="radio" v-model="userData.gender" value="2" />女
          </label>
        </div>
      </label>

      <button @click="updateUser" class="custom-btn-primary mt-8 w-full rounded-lg md:w-[60%]">
        送出更新
      </button>
    </div>
    <!-- 重設密碼 -->
    <div
      class="custom-border-2 custom-b-shadow list-item-block flex flex-col items-center rounded-lg bg-white px-[102px] py-8"
      v-else
    >
      <label class="mb-4 w-full"
        >輸入新密碼
        <input
          v-model="newPassword"
          type="password"
          class="custom-input h-[120px]"
          placeholder="輸入新密碼"
        />
      </label>
      <label class="mb-4 w-full"
        >再次輸入
        <input
          v-model="newConfirmPassword"
          type="password"
          class="custom-input h-[120px]"
          placeholder="再次輸入"
        />
      </label>
      <button
        @click="updateUserPassword()"
        class="custom-btn-primary mt-8 w-full rounded-lg md:w-[60%]"
      >
        重設密碼
      </button>
    </div>
  </div>
</template>

<style scoped>
.custom-tab {
  border: 2px solid #000;
  background-color: #fff;
  padding: 8px 24px;
  border-radius: 8px 8px 0 0;
  transform: translate(0, 2px);
  transition: all 0.2s ease-in-out;
}

.act {
  background-color: #000;
  color: #fff;
}
</style>
