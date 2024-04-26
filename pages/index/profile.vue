<script setup>
const userData = ref([])

const tab = ref(1)
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
    <div class="flex pl-4">
      <div class="custom-tab" @click="tab = 1" :class="{ act: tab === 1 }">暱稱修改</div>
      <div class="custom-tab" @click="tab = 2" :class="{ act: tab === 2 }">重設密碼</div>
    </div>
    <!-- 暱稱修改 -->
    <div
      v-if="tab === 1"
      class="custom-border-2 custom-b-shadow list-item-block flex flex-col items-center rounded-lg bg-white px-[102px] py-8"
    >
      <div class="avatar h-[108px] w-[108px]">
        <img src="~/assets/images/userPic.jpg" alt="avatar" class="pic-auto" />
      </div>
      <button class="mt-5 bg-black px-6 py-1 text-white">上傳大頭照</button>

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

      <button class="custom-btn-primary mt-8 w-full rounded-lg md:w-[60%]">送出更新</button>
    </div>
    <!-- 重設密碼 -->
    <div
      class="custom-border-2 custom-b-shadow list-item-block flex flex-col items-center rounded-lg bg-white px-[102px] py-8"
      v-else
    >
      <label class="mb-4 w-full"
        >輸入新密碼
        <input
          v-model="userData.name"
          type="text"
          class="custom-input h-[120px]"
          placeholder="輸入新密碼"
        />
      </label>
      <label class="mb-4 w-full"
        >再次輸入
        <input
          v-model="userData.name"
          type="text"
          class="custom-input h-[120px]"
          placeholder="再次輸入"
        />
      </label>
      <button class="custom-btn-primary mt-8 w-full rounded-lg md:w-[60%]">重設密碼</button>
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
