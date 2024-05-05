<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: 'redirect-if-logged-in'
})

import type { apiResponse } from '~/models'
import { APIStore } from '~/store/apiService'
const store = APIStore()

import { showToast, openDialog, showLoading, hideLoading } from '~/store/eventBus'

import { useRouter } from 'vue-router'
const router = useRouter()

const email = ref('')
const password = ref('')

async function login() {
  if (email.value === '' || password.value === '') {
    showToast('請輸入帳號密碼')
    return
  }

  let data = {
    email: email.value,
    password: password.value
  }

  try {
    showLoading()
    const res = await store.apiLogin(data)
    const result = res.data
    console.log(`login result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      store.saveUserDataToLocalStorage({
        token: result.user.token,
        id: result.user.id,
        name: result.user.name,
        googleId: result.user.googleId,
        avatar: result.user.avatar,
        isAdmin: result.user.isAdmin
      })

      router.push('/')

      showToast('登入成功')
    } else {
      showToast('帳號或密碼錯誤，請重新輸入！')
      // console.log(result.message);
    }
  } catch (e: any) {
    // showToast('帳號或密碼錯誤，請重新輸入！')
    console.log(e.response.data.message)
    showToast(e.response.data.message)
  } finally {
    hideLoading()
  }
}

/** 
//  * Google 登入 第一版
async function googleLogin() {
  try {
    showLoading()
    const res = await store.apiGoogleLogin()
    const result = res.data
    console.log(`googleLogin result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      store.saveUserDataToLocalStorage({
        token: result.user.token,
        id: result.user.id,
        name: result.user.name,
        googleId: result.user.googleId
      })

      router.push('/')
      showToast('登入成功')
    } else {
      showToast('帳號或密碼錯誤，請重新輸入！')
      // console.log(result.message);
    }
  } catch (e: any) {
    showToast(e.response.data.message)
  } finally {
    hideLoading()
  }
}


// 這個重定向過去，會轉址到後端的 Google 登入端點，會成功但回不來前端
const handleGoogleLogin = async () => {
  try {
    // 將用戶重定向到後端的 Google 登入端點
    window.location.href = 'http://localhost:3666/users/google'
  } catch (error) {
    console.error('Error:', error)
  }
}


//  * Google 登入 第二版
// Google 登入頁面直接出不來
async function googleLogin() {
  try {
    showLoading()
    // 將用戶重定向到後端的 Google 登入端點
    const res = await store.apiGoogleLogin()
    const result = res
    console.log(`googleLogin result = ${JSON.stringify(result)}`)
    if (result.statusCode === 200) {
      store.saveUserDataToLocalStorage({
        token: result.user.token,
        id: result.user.id,
        name: result.user.name,
        googleId: result.user.googleId
      })
      if (result.data.user.url) {
        location.href = result.data.user.url
      }
    }
  } catch (e: any) {
    // showToast(e.response.data.message)
    console.error(e)
  } finally {
    hideLoading()
  }
}
*/
</script>

<template>
  <div class="login flex min-h-screen w-full items-center justify-center pb-[60px] sm:pb-[20px]">
    <div
      class="custom-border-2 m-5 flex w-full max-w-[880px] flex-col gap-5 px-[48px] py-[70px] md:grid md:grid-cols-2 md:gap-12"
      style="box-shadow: -8px 8px 0px #00040029; background: #efece7"
    >
      <div class="m-auto w-[60%] md:w-full">
        <img src="~/assets/images/welcome.svg" alt="" class="pic-auto" />
      </div>
      <div class="text-center">
        <div class="paytone-one-regular text-primary text-[48px] font-bold md:text-[60px]">
          Chat!
        </div>
        <div class="text-[20px] font-bold md:text-[24px]">到雀特展開全新社交圈</div>
        <input v-model="email" type="text" class="custom-input mt-9" placeholder="Email" />
        <input
          v-model="password"
          type="Password"
          class="custom-input mt-4"
          placeholder="Password"
          @keyup.enter="login"
        />

        <!-- <div class="mt-4 text-red-500">帳號或密碼錯誤，請重新輸入！</div> -->
        <button
          v-if="email && password"
          @click="login"
          class="custom-btn-primary mt-8 w-full rounded-lg"
        >
          登入
        </button>
        <button v-else class="custom-btn-disabled mt-8 w-full rounded-lg">登入</button>

        <div class="flex flex-col lg:flex-row justify-center items-center gap-4 mt-4">
          <NuxtLink to="/login/register" class="custom-link transform duration-200">我沒有帳號，前往註冊</NuxtLink>
          <span class="hidden lg:block text-gray-400">|</span>
          <NuxtLink to="/" class="custom-link transform duration-200">回首頁繼續當訪客</NuxtLink>
        </div>

        <!-- <hr class="mt-4 border-black" /> -->
        <!-- google 登入 -->
        <!-- <button @click="handleGoogleLogin" class="custom-btn-primary mt-4 w-full rounded-lg">
          Google 登入
        </button> -->
        <!-- <a class="m-btn register-btn" href="#" @click.prevent="handleGoogleLogin" target="_blank">
          Google帳號登入
        </a> -->
      </div>
    </div>
    <Footer />
  </div>
  <ToastTool />
</template>

<style scoped>
.login {
  background: url('~/assets/images/bg.png') no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  font-family: 'Azeret Mono';
}

.custom-link:hover {
  color: #03438d;
}
</style>
