<script setup lang="ts">
definePageMeta({
  layout: false
})

import type { apiResponse } from '~/models'
import Id from '~/pages/index/otherWall/[id].vue'
import { APIStore } from '~/store/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/store/eventBus'

interface User {
  _id: string
  name: string
  avatar: string
}

interface Announcement {
  _id?: string
  title: string
  content: string
  status: number
  user?: User
  tag: string
  views?: number
  createdAt?: string
  updatedAt?: string
  time?: string // 這個字段可能不存在，所以標記為可選
}

type AnnouncementList = Announcement[]

// 公告列表
const list: Ref<AnnouncementList> = ref([])

onMounted(() => {
  loadData()
})

// NOTE keyword 關鍵字
const currentKeyword = ref('')

// NOTE date 日期

// 獲取當前日期
const now = new Date()

// 獲取當前月份的第一天
const startDate = new Date(now.getFullYear(), now.getMonth(), 1)
// 獲取當前月份的最後一天
const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)

// 將日期格式化為 YYYY-MM-DD
const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 將格式化後的日期設置為 ref 的初始值
const currentStartDate = ref(formatDate(startDate))
const currentEndDate = ref(formatDate(endDate))

// NOTE tag 標籤
const currentTag = ref('') // 標籤
const tagOption = ['全部', '公告', '功能', '其他']

const dropdownVisible = ref(false)
const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value
}

// 選擇標籤的方法
const selectTagOption = (tag: string) => {
  // 如果選擇的是 '全部'，則將 currentTag 的值設置為 ''
  if (tag === '全部') {
    currentTag.value = ''
  } else {
    currentTag.value = tag
  }
  dropdownVisible.value = false
  console.log(`currentTag.value = ${currentTag.value}`)
}

// NOTE status 狀態
const currentStatus = ref('') // 狀態
const statusDropdowns = ref(false)
const toggleStatusDropdowns = () => {
  statusDropdowns.value = !statusDropdowns.value
}

// 定義狀態選項
const statusOptions = [
  { label: '全部', value: '' },
  { label: '草稿', value: '0' },
  { label: '發布中', value: '1' }
]

// 選擇狀態的方法
const selectStatus = (status: string) => {
  currentStatus.value = status
  statusDropdowns.value = false
  console.log(`currentStatus.value = ${currentStatus.value}`)
}

// 計算屬性來獲取 當前選中狀態的 label
const currentStatusLabel = computed(() => {
  const option = statusOptions.find((option) => option.value === currentStatus.value)
  return option ? option.label : ''
})

// 定義當前模式和當前公告
const currentMode = ref('') // '' 表示沒有選擇任何模式
const currentAnnouncement: Ref<Announcement | null> = ref(null) // 用於存儲當前要編輯或查看的公告
const modal = ref(false) // 用於控制 modal 的顯示與隱藏

// 新增公告的方法
const addAnnouncement = () => {
  currentMode.value = 'add'
  currentAnnouncement.value = { title: '', content: '', status: 0, tag: '', views: 0 } // 創建一個空的公告對象
  modal.value = true
}

// 送出新增公告
async function saveAdd() {
  // 檢查 currentAnnouncement.value 是否為 null
  if (!currentAnnouncement.value) {
    console.error('currentAnnouncement is null')
    return // 如果為 null，則不進行後續操作
  }

  let data = {
    title: currentAnnouncement.value.title,
    content: currentAnnouncement.value.content,
    status: Number(currentAnnouncement.value.status),
    tag: currentAnnouncement.value.tag
  }
  console.log(`data = ${JSON.stringify(data)}`)

  try {
    showLoading()

    const res = await store.apiPostAnnouncement(data)
    const result = res.data
    console.log(`editEvent result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      showToast('新增公告成功')
      modal.value = false
      reset()

      loadData()
    } else {
      showToast('新增公告失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// 編輯公告的方法
const editAnnouncement = (announcement: Announcement) => {
  currentMode.value = 'edit'
  currentAnnouncement.value = announcement
  console.log(`currentAnnouncement.value = ${JSON.stringify(currentAnnouncement.value)}`)

  modal.value = true
}

// 儲存編輯公告
async function saveEdit() {
  // 檢查 currentAnnouncement.value 是否為 null
  if (!currentAnnouncement.value) {
    console.error('currentAnnouncement is null')
    return // 如果為 null，則不進行後續操作
  }

  let data: any = {
    title: currentAnnouncement.value.title,
    content: currentAnnouncement.value.content,
    status: Number(currentAnnouncement.value.status),
    tag: currentAnnouncement.value.tag,
    id: currentAnnouncement.value._id
  }
  console.log(`data = ${JSON.stringify(data)}`)

  try {
    showLoading()

    const res = await store.apiUpdateAnnouncement(data)
    const result = res.data
    console.log(`editEvent result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      showToast('編輯公告成功')
      modal.value = false
      reset()

      loadData()
    } else {
      showToast('編輯公告失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

// 檢視公告的方法
const viewAnnouncement = (announcement: Announcement) => {
  currentMode.value = 'view'
  currentAnnouncement.value = announcement
  console.log(`currentAnnouncement.value = ${JSON.stringify(currentAnnouncement.value)}`)
  modal.value = true
}

function reset() {
  currentAnnouncement.value = null
}

function cancel() {
  modal.value = false
  reset()
}

// NOTE api
async function loadData() {
  let data = {
    status: currentStatus.value,
    tag: currentTag.value,
    keyword: currentKeyword.value,
    startDate: currentStartDate.value,
    endDate: currentEndDate.value
  }

  try {
    showLoading()
    const res = await store.apiGetAdminAnnouncements(data)
    const result = res.data
    console.log(`result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      list.value = result.data
      console.log(`list = ${JSON.stringify(list)}`)
    } else {
      console.log('取得公告列表失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

async function deleteAnnouncement(announcement: Announcement) {
  // 顯示確認彈窗
  const isConfirmed = await openDialog('注意', '您確定要刪除這個公告嗎？')

  // 如果用戶確認了刪除操作
  if (!isConfirmed) {
    return
  }
  let data: any = {
    id: announcement._id
  }

  try {
    showLoading()
    const res = await store.apiDeleteAnnouncement(data)
    const result = res.data
    console.log(`result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      showToast('刪除公告成功')
      loadData()
    } else {
      console.log('刪除公告失敗')
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

</script>

<template>
  <main class="index">
    <!-- 篩選列 status tag keyword startDate endDate -->
    <div class="flex flex-col lg:flex-row lg:gap-3">
      <!-- 日期選擇 -->
      <div class="flex flex-col gap-3 sm:flex-row">
        <input type="date" class="custom-input w-full" v-model="currentStartDate" />
        <input type="date" class="custom-input" v-model="currentEndDate" />
      </div>

      <div class="mt-3 flex grow flex-col gap-3 sm:flex-row lg:mt-0">
        <div class="flex gap-3">
          <!-- 標籤選擇 -->
          <div class="relative w-full min-w-[128px]">
            <div class="custom-select" @click="toggleDropdown">
              {{ currentTag ? currentTag : '全部' }}
              <Icon name="material-symbols:keyboard-arrow-down" size="26"></Icon>
            </div>
            <div class="custom-select-options" v-if="dropdownVisible">
              <div
                class="option"
                :class="{ 'option-selected': option === currentTag }"
                v-for="(option, index) in tagOption"
                :key="option"
                @click="selectTagOption(option)"
              >
                {{ option }}
              </div>
            </div>
          </div>

          <!-- 狀態選擇 -->
          <div class="relative w-full min-w-[128px]">
            <div class="custom-select" @click="toggleStatusDropdowns">
              {{ currentStatusLabel }}
              <Icon name="material-symbols:keyboard-arrow-down" size="26"></Icon>
            </div>
            <div class="custom-select-options" v-if="statusDropdowns">
              <div
                class="option"
                :class="{ 'option-selected': option.value === currentStatus }"
                v-for="(option, index) in statusOptions"
                :key="index"
                @click="selectStatus(option.value)"
              >
                {{ option.label }}
              </div>
            </div>
          </div>
        </div>

        <!-- 關鍵字查詢 -->
        <div class="custom-search-input grow">
          <input
            type="text"
            placeholder="搜尋貼文"
            v-model="currentKeyword"
            @keyup.enter="loadData"
          />
          <button @click="loadData">
            <Icon name="material-symbols:search" size="28"></Icon>
          </button>
        </div>
      </div>
    </div>

    <!-- 公告列表 檢視 新增 -->
    <div class="mt-3 flex justify-end">
      <button @click="addAnnouncement" class="custom-btn-primary w-[120px] rounded-lg">新增</button>
    </div>

    <div
      v-if="list && list.length > 0"
      class="custom-b-shadow mt-4 flex flex-col gap-4 rounded-lg border-2 border-black bg-white p-3"
    >
      <div v-for="item in list" :key="item._id" class="border-b border-gray-300 pb-3">
        <div class="flex justify-between gap-3">
          <div class="text-primary">{{ item.tag }}</div>
          <div class="text-[14px] text-gray-400">{{ item.status === 1 ? '發布中' : '草稿' }}</div>
        </div>
        <div class="text-[20px]">{{ item.title }}</div>
        <div class="text-[14px] text-gray-400">{{ item.updatedAt }}</div>
        <!-- <div class="">{{ item.content }}</div> -->

        <div class="flex items-center justify-end gap-3">
          <button @click="deleteAnnouncement(item)" class="custom-btn-icon border-red-500">
            <Icon
              name="material-symbols:delete-outline-rounded"
              size="24"
              class="transform text-red-500 duration-200 hover:opacity-80"
            ></Icon>
          </button>

          <button @click="viewAnnouncement(item)" class="custom-btn-icon border-gray-700">
            <Icon
              name="material-symbols:visibility-outline-rounded"
              size="24"
              class="transform text-gray-700 duration-200 hover:opacity-80"
            ></Icon>
          </button>

          <button @click="editAnnouncement(item)" class="custom-btn-icon border-primary mr-2">
            <Icon
              name="material-symbols:edit-outline-rounded"
              size="24"
              class="text-primary transform duration-200 hover:opacity-80"
            ></Icon>
          </button>
        </div>
      </div>
    </div>

    <div
      v-else
      class="custom-b-shadow mt-4 flex flex-col gap-4 rounded-lg border-2 border-black bg-white p-5 text-center text-gray-400"
    >
      暫時沒有公告
    </div>

    <!-- 公告彈窗 檢視 新增 -->

    <div v-if="modal" class="modal fixed inset-0 z-30 bg-black bg-opacity-20 sm:px-6 sm:py-16">
      <div
        class="custom-b-shadow m-auto w-full max-w-[1200px] rounded-lg border-2 border-black bg-white p-5 max-h-full overflow-y-scroll"
      >
        <div class="mb-5 flex items-center">
          <div class="grow text-[24px] font-medium">
            {{ currentMode === 'add' ? '新增' : currentMode === 'edit' ? '編輯' : '檢視' }}公告
          </div>
          <Icon
            name="material-symbols:close-rounded"
            size="40"
            class="cursor-pointer"
            @click="cancel"
          ></Icon>
        </div>
        <div v-if="currentAnnouncement" class="flex flex-col gap-3">
          <label
            >標題
            <input
              class="custom-input text-xl font-bold"
              v-model="currentAnnouncement.title"
              :disabled="currentMode === 'view'"
            />
          </label>

          <!-- <label
            >內文
            <textarea
              class="custom-input min-h-[260px] text-xl font-bold"
              v-model="currentAnnouncement.content"
              :disabled="currentMode === 'view'"
            ></textarea>
          </label> -->
          <div>
            <label>內文 <span v-if="currentMode === 'add' || currentMode === 'edit'" class="text-[14px] text-gray-400">目前不支援本地圖片上傳，僅支援圖片網址</span></label>
            <div
              class="custom-area"
              v-if="currentMode === 'view'"
              v-html="currentAnnouncement.content"
            ></div>
            <the-ckeditor
              v-else
              v-model="currentAnnouncement.content"
              class="border-2 border-black"
            ></the-ckeditor>
          </div>

          <div class="flex flex-col gap-2 sm:flex-row sm:gap-5">
            <label>狀態</label>
            <div class="flex flex-wrap gap-5">
              <div class="flex items-center gap-2">
                <input
                  type="radio"
                  id="draft"
                  value="0"
                  v-model="currentAnnouncement.status"
                  :disabled="currentMode === 'view'"
                />
                <label for="draft">草稿</label>
              </div>
              <div class="flex items-center gap-2">
                <input
                  type="radio"
                  id="published"
                  value="1"
                  v-model="currentAnnouncement.status"
                  :disabled="currentMode === 'view'"
                />
                <label for="published">發布</label>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-2 sm:flex-row sm:gap-5">
            <label>標籤</label>
            <div class="flex flex-wrap gap-5">
              <div class="flex items-center gap-2">
                <input
                  type="radio"
                  id="tag1"
                  value="公告"
                  v-model="currentAnnouncement.tag"
                  :disabled="currentMode === 'view'"
                />
                <label for="tag1">公告</label>
              </div>
              <div class="flex items-center gap-2">
                <input
                  type="radio"
                  id="tag2"
                  value="功能"
                  v-model="currentAnnouncement.tag"
                  :disabled="currentMode === 'view'"
                />
                <label for="tag2">功能</label>
              </div>
              <div class="flex items-center gap-2">
                <input
                  type="radio"
                  id="tag3"
                  value="其他"
                  v-model="currentAnnouncement.tag"
                  :disabled="currentMode === 'view'"
                />
                <label for="tag3">其他</label>
              </div>
            </div>
          </div>

          <div v-if="currentMode === 'add'" class="mt-4 flex justify-center">
            <button
              v-if="
                !currentAnnouncement.title ||
                !currentAnnouncement.content ||
                !currentAnnouncement.tag
              "
              class="custom-btn-disabled w-full rounded-lg sm:w-[60%]"
            >
              新增
            </button>
            <button
              v-else
              @click="saveAdd()"
              class="custom-btn-primary w-full rounded-lg sm:w-[60%]"
            >
              新增
            </button>
          </div>

          <div v-if="currentMode === 'edit'" class="mt-4 flex justify-center">
            <button @click="saveEdit()" class="custom-btn-primary w-full rounded-lg sm:w-[60%]">
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.custom-btn-icon {
  @apply rounded-md border px-2 py-1;
}
</style>
