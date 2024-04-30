<script setup lang="ts">
// apiGetUserFollowList
import defaultAvatar from '~/assets/images/userPic.png'
import { APIStore } from '~/store/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/store/eventBus'

const list = ref({})

getUserFollowList()

async function getUserFollowList() {
  try {
    showLoading()
    const res = await store.apiGetUserFollowList()
    const result = result.data
    console.log(`getUserFollowList result = ${JSON.stringify(result)}`)
    if (result.statusCode == 200) {
      console.log('取得追蹤名單成功')
      lest.value = result.data.following
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
    <!-- todo 還沒放進去 tracking list -->
    <div class="flex flex-col gap-4" v-if="list.length > 0">
      <div
        class="custom-border-2 custom-b-shadow list-item-block flex gap-4 rounded-lg bg-white p-4"
      >
        <div class="custom-avatar-clear h-[40px] w-[40px]">
          <img src="~/assets/images/userPic.jpg" alt="avatar" class="pic-auto" />
        </div>
        <div class="flex grow flex-col md:flex-row">
          <div class="flex grow flex-col">
            <div class="list-item-name transform font-bold duration-200">愛爾敏</div>
            <div class="text-gray-400">追蹤時間：2022/1/10 12:00</div>
          </div>
          <div class="md:self-end">您已追蹤 90 天！</div>
        </div>
      </div>
      <div
        class="custom-border-2 custom-b-shadow list-item-block flex gap-4 rounded-lg bg-white p-4"
      >
        <div class="custom-avatar-clear h-[40px] w-[40px]">
          <img src="~/assets/images/userPic.jpg" alt="avatar" class="pic-auto" />
        </div>
        <div class="flex grow flex-col md:flex-row">
          <div class="flex grow flex-col">
            <div class="list-item-name transform font-bold duration-200">愛爾敏</div>
            <div class="text-gray-400">追蹤時間：2022/1/10 12:00</div>
          </div>
          <div class="md:self-end">您已追蹤 90 天！</div>
        </div>
      </div>
    </div>

    <!-- tracking list none -->
    <div class="flex flex-col gap-4" v-else>
      <div
        class="custom-border-2 custom-b-shadow list-item-block flex gap-4 rounded-lg bg-white p-4 justify-center text-gray-400"
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
