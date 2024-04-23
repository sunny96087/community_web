<!-- 全體動態牆 -->
<template>
  <div class="">
    <div class="flex gap-3">
      <!-- 貼文種類選擇 -->
      <div class="w-25 relative">
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
        <input type="text" placeholder="搜尋貼文" />
        <button>
          <Icon name="material-symbols:search" size="28"></Icon>
        </button>
      </div>
    </div>

    <!-- post list -->
    <div class="mt-4 flex flex-col gap-3">
      <!-- post -->
      <div class="rounded-lg border-2 border-black bg-white p-6">
        <div class="flex items-center gap-4">
          <div class="h-[45px] w-[45px] overflow-hidden rounded-full border-2 border-black">
            <img src="~/assets/images/userPic.jpg" alt="pic" class="pic-auto" />
          </div>
          <div class="flex grow flex-col">
            <div class="font-bold">邊緣小杰</div>
            <div class="text-[12px] text-gray-400">2022/1/10 12:00</div>
          </div>
        </div>

        <div class="mt-4">
          外面看起來就超冷.... <br />
          我決定回被窩繼續睡....>.<
        </div>

        <div class="mt-4 w-full overflow-hidden rounded-lg border-2 border-black">
          <img src="~/assets/images/userPic.jpg" alt="pic" class="pic-auto" />
        </div>

        <div class="mt-5">
          <div class="flex items-center gap-2">
            <Icon name="material-symbols:thumb-up-outline" size="24" class="text-primary"></Icon>
            5
          </div>
          <!-- <div v-else class="flex items-center gap-2 text-gray-400">
              <Icon name="material-symbols:thumb-up-outline" size="24" class="text-primary"></Icon> 成為第一個按讚的朋友
            </div> -->
        </div>

        <div class="my-5 flex gap-2">
          <div class="avatar h-[40px] w-[40px]">
            <img src="~/assets/images/userPic.jpg" alt="avatar" class="pic-auto" />
          </div>

          <div class="custom-search-input h-[40px] grow">
            <input type="text" placeholder="留言..." />
            <button class="w-[128px]">留言</button>
          </div>
        </div>

        <!-- 留言列表 -->
        <div class="flex flex-col gap-4">
          <div class="flex gap-3 rounded-xl bg-gray-50 p-4">
            <div class="avatar h-[40px] w-[40px]">
              <img src="~/assets/images/userPic.jpg" alt="avatar" class="pic-auto" />
            </div>
            <div class="flex flex-col">
              <div class="">Sunny</div>
              <div class="text-[12px] text-gray-400">2022/1/11 10:00</div>
              <div class="mt-1">真的～我已經準備冬眠了</div>
            </div>
          </div>
          <div class="flex gap-3 rounded-xl bg-gray-50 p-4">
            <div class="avatar h-[40px] w-[40px]">
              <img src="~/assets/images/userPic.jpg" alt="avatar" class="pic-auto" />
            </div>
            <div class="flex flex-col">
              <div class="">Sunny</div>
              <div class="text-[12px] text-gray-400">2022/1/11 10:00</div>
              <div class="mt-1">真的～我已經準備冬眠了</div>
            </div>
          </div>
        </div>
      </div>

      <!-- v-else no post -->
      <div
        class="rounded-lg border-2 border-black bg-white"
        style="box-shadow: 0px 3px 0px #000400"
      >
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
        <div class="py-8 text-center text-gray-400">目前尚無動態，新增一則貼文吧！</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const currentPostType = ref(0)
const postTypeOption = ['最新貼文', '熱門貼文', '追蹤貼文']

const dropdownVisible = ref(false)

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value
}

const selectOption = (index: number) => {
  currentPostType.value = index
  dropdownVisible.value = false
  console.log(`currentPostType.value = ${currentPostType.value}`)
}
</script>
