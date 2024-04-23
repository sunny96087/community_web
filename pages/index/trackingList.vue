<template>
  <div class="">
    <!-- 追蹤名單 -->
    <div class="relative mb-4">
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
    <div class="flex flex-col gap-4">
      <div class="custom-border-2 custom-b-shadow flex gap-4 rounded-lg bg-white p-4 list-item-block">
        <div class="custom-avatar-clear h-[40px] w-[40px]">
          <img src="~/assets/images/userPic.jpg" alt="avatar" class="pic-auto" />
        </div>
        <div class="flex flex-col md:flex-row grow">
          <div class="flex grow flex-col">
            <div class="font-bold list-item-name transform duration-200">愛爾敏</div>
            <div class="text-gray-400">追蹤時間：2022/1/10 12:00</div>
          </div>
          <div class="md:self-end">您已追蹤 90 天！</div>
        </div>
      </div>
      <div class="custom-border-2 custom-b-shadow flex gap-4 rounded-lg bg-white p-4 list-item-block">
        <div class="custom-avatar-clear h-[40px] w-[40px]">
          <img src="~/assets/images/userPic.jpg" alt="avatar" class="pic-auto" />
        </div>
        <div class="flex flex-col md:flex-row grow">
          <div class="flex grow flex-col">
            <div class="font-bold list-item-name transform duration-200">愛爾敏</div>
            <div class="text-gray-400">追蹤時間：2022/1/10 12:00</div>
          </div>
          <div class="md:self-end">您已追蹤 90 天！</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
.list-item-block:hover .list-item-name{
  color: #03438D;
  text-decoration: underline;
}
</style>
