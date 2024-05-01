<script setup lang="ts">
import { APIStore } from '~/store/apiService'
const store = APIStore()
import defaultAvatar from '~/assets/images/userPic.png'
</script>

<template>
  <div class="hidden px-6 py-8 min-w-[310px] bg-white border-2 border-black lg:flex lg:flex-col gap-6">
    <nuxtLink to="/addArticle" class="btn-add">
      張貼動態
    </nuxtLink>
    <nuxtLink to="/myWall" class="bar-item">
      <div class="w-12 h-12 border-2 border-black rounded-full overflow-hidden">
        <img :src="store.userInfo?.avatar || defaultAvatar" alt="avatar" class="pic-auto">
      </div>
      {{ store.userInfo?.name || 'Member' }}
    </nuxtLink>
    <nuxtLink to="/trackingList" class="bar-item">
      <div class="icon-default">
        <Icon name="material-symbols:notifications-outline" size="26"></Icon>
      </div>
      追蹤名單
    </nuxtLink>
    <nuxtLink to="/likeArticleList" class="bar-item">
      <div class="icon-default">
        <Icon name="material-symbols:thumb-up-outline" size="24"></Icon>
      </div>
      我按讚的文章
    </nuxtLink>
  </div>
</template>
<style scoped>
.btn-add{
  @apply text-center py-4 font-bold border-2 border-black rounded-lg text-white transform duration-200;
  background-color: #03438D;
  box-shadow: -2px 2px 0px #000400;
}

.btn-add:hover{
  background-color: #EEC32A;
  color: #000;
}

.bar-item{
  @apply flex gap-4 items-center font-bold;
}

.icon-default{
  @apply w-[50px] h-[50px] flex justify-center items-center border-2 border-black rounded-full transform duration-200;
  background: #E2EDFA;
}

.bar-item:hover .icon-default{
  @apply text-white;
  background: #03438D;
}


</style>
