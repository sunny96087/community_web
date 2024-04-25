<template>
  <div class="login min-h-screen w-full flex items-center justify-center">
    <div class="max-w-[880px] w-full mx-5 custom-border-2 px-[48px] py-[70px] flex flex-col md:grid md:grid-cols-2 gap-5 md:gap-12" style="box-shadow: -8px 8px 0px #00040029;background: #EFECE7;">
      
      <div class="w-[60%] m-auto md:w-[80%]">
        <img src="~/assets/images/welcome.svg" alt="">
      </div>
      <div class="text-center">
        <div class="text-[60px] paytone-one-regular font-bold text-primary">MetaWall</div>
        <div class="text-[24px] font-bold">註冊</div>
        <input
          v-model="imageLink"
          type="text"
          class="custom-input mt-9"
          placeholder="Email"
          
        />
        <div class="mt-4 text-red-500">暱稱至少 2 個字元以上</div>
        <input
          v-model="imageLink"
          type="text"
          class="custom-input mt-9"
          placeholder="Email"
          
        />
        <div class="mt-4 text-red-500">帳號已被註冊，請替換新的 Email！</div>
        <input
          v-model="imageLink"
          type="Password"
          class="custom-input mt-4"
          placeholder="Password"
          
        />
        <div class="mt-4 text-red-500">密碼需至少 8 碼以上，並中英混合</div>

        <button class="custom-btn-primary mt-8 w-full rounded-lg">註冊</button>
        <div class="mt-4">我有帳號，前往登入</div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: false
})
</script>

<style scoped>

.login{
 background: url('~/assets/images/bg.png') no-repeat center center;
 background-size: cover;
 background-attachment: fixed; 
 font-family: 'Azeret Mono';
}
</style>