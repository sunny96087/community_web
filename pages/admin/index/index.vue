<script setup lang="ts">
definePageMeta({
  layout: false
})

import type { apiResponse } from '~/models'
import { APIStore } from '~/store/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/store/eventBus'

const list = ref([])

onMounted(() => {
  loadData()
})

// query
const currentStatus = ref(1)
const currentTag = ref('')
const currentKeyword = ref('')

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
</script>

<template>
  <main class="index">
    <!-- 篩選列 status tag keyword startDate endDate -->

    <!-- 公告列表 檢視 新增 -->
    
    <!-- 公告彈窗 檢視 新增 -->
  </main>
</template>

<style scoped></style>
