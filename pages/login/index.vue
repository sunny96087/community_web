<script setup>
definePageMeta({
  layout: false
})
</script>

<template>
  <div class="login min-h-screen w-full flex items-center justify-center">
    <div class="max-w-[880px] w-full m-5 custom-border-2 px-[48px] py-[70px] flex flex-col md:grid md:grid-cols-2 gap-5 md:gap-12" style="box-shadow: -8px 8px 0px #00040029;background: #EFECE7;">
      
      <div class="w-[60%] m-auto md:w-full" >
        <img src="~/assets/images/welcome.svg" alt="" class="pic-auto">
      </div>
      <div class="text-center">
        <div class="text-[48px] md:text-[60px] paytone-one-regular font-bold text-primary">MetaWall</div>
        <div class="text-[20px] md:text-[24px] font-bold">到元宇宙展開全新社交圈</div>
        <input
          v-model="imageLink"
          type="text"
          class="custom-input mt-9"
          placeholder="Email"
          
        />
        <input
          v-model="imageLink"
          type="Password"
          class="custom-input mt-4"
          placeholder="Password"
          
        />

        <div class="mt-4 text-red-500">帳號或密碼錯誤，請重新輸入！</div>
        <button class="custom-btn-disabled mt-8 w-full rounded-lg">登入</button>
        <button class="custom-btn-primary mt-8 w-full rounded-lg">登入</button>
        <NuxtLink to="/login/register" class="block mt-4">註冊帳號</NuxtLink>
      </div>
    </div>
  </div>
</template>


<style scoped>

.login{
 background: url('~/assets/images/bg.png') no-repeat center center;
 background-size: cover;
 background-attachment: fixed; 
 font-family: 'Azeret Mono';
}
</style>