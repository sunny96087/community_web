<template>
  <div class="hidden px-6 py-8 w-[310px] bg-white border-2 border-black lg:flex lg:flex-col gap-6">
    <nuxtLink to="/addArticle" class="btn-add">
      張貼動態
    </nuxtLink>
    <nuxtLink to="/myWall" class="bar-item">
      <div class="w-12 h-12 border-2 border-black rounded-full overflow-hidden">
        <img src="~/assets/images/userPic.jpg" alt="avatar" class="pic-auto">
      </div>
      邊緣小杰
    </nuxtLink>
    <nuxtLink to="/trackingList" class="bar-item">
      <div class="icon-bell">
        <Icon name="material-symbols:notifications-outline" size="26"></Icon>
      </div>
      追蹤名單
    </nuxtLink>
    <nuxtLink to="/likeArticleList" class="bar-item">
      <div class="icon-like">
        <Icon name="material-symbols:thumb-up-outline" size="24"></Icon>
      </div>
      我按讚的文章
    </nuxtLink>
  </div>
</template>
<style scoped>
.btn-add{
  @apply text-center py-4 font-bold border-2 border-black rounded-lg;
  background-color: #EEC32A;
  box-shadow: -2px 2px 0px #000400;
}

.bar-item{
  @apply flex gap-4 items-center font-bold;
}

.icon-bell{
  @apply w-[50px] h-[50px] flex justify-center items-center border-2 border-black rounded-full text-white;
  background: #03438D;
}

.icon-like{
  @apply w-[50px] h-[50px] flex justify-center items-center border-2 border-black rounded-full;
  background: #E2EDFA;
}
</style>
