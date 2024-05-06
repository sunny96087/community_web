<script setup>
definePageMeta({
  layout: false,
  middleware: 'redirect-if-logged-in'
})

import { APIStore } from '~/store/apiService'
const store = APIStore()
import { showToast, openDialog, showLoading, hideLoading } from '~/store/eventBus'
const router = useRouter()

// 資料
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// 錯誤驗證
const checkNameError = ref(false)
const checkEmailError = ref(false)
const checkEmailErrorMessage = ref('email 不得為空')
const checkPasswordError = ref(false)
const checkConfirmPasswordError = ref(false)

const checkName = () => {
  if (name.value.length < 2) {
    // 這裡進行你的檢查邏輯，例如顯示一個錯誤訊息
    console.log('暱稱至少 2 個字元以上')
    checkNameError.value = true
  } else {
    checkNameError.value = false
  }
}

const checkEmail = async () => {
  if (email.value && email.value !== '') {
    // 這裡進行你的檢查邏輯，例如顯示一個錯誤訊息

    try {
      showLoading()

      let data = {
        email: email.value
      }
      console.log(data)

      const res = await store.apiCheckEmail(data)
      const result = res.data
      console.log(`editEvent result = ${JSON.stringify(result)}`)

      if (result.statusCode === 200) {
        checkEmailError.value = false
      } else {
        checkEmailError.value = true
      }
    } catch (e) {
      console.log(e)
      checkEmailErrorMessage.value = '帳號已被註冊，請替換新的 Email！'
      checkEmailError.value = true
    } finally {
      hideLoading()
    }
  } else {
    checkEmailErrorMessage.value = 'email 不得為空'
    checkEmailError.value = true
  }

  if (email.value && email.value !== '') {
    // 驗證格式是否為信箱格式
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(email.value)) {
      console.log('email 格式正確')
    } else {
      checkEmailErrorMessage.value = 'email 格式不正確'
      checkEmailError.value = true
    }
  }
}

const checkPassword = () => {
  // 檢查密碼是否包含中英文混合
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/
  if (password.value.length < 8 || !passwordRegex.test(password.value)) {
    // 這裡進行你的檢查邏輯，例如顯示一個錯誤訊息
    checkPasswordError.value = true
  } else {
    checkPasswordError.value = false
  }
}

const checkConfirmPassword = () => {
  if (confirmPassword.value !== password.value) {
    // 這裡進行你的檢查邏輯，例如顯示一個錯誤訊息
    checkConfirmPasswordError.value = true
  } else {
    checkConfirmPasswordError.value = false
  }
}

// 註冊 + 電子信箱驗證
async function registerVerifyEmail() {
  if (
    name.value !== '' &&
    email.value !== '' &&
    password.value !== '' &&
    confirmPassword.value !== ''
  ) {
    let data = {
      name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    }

    try {
      showLoading()
      const res = await store.apiVerifyEmail(data)
      const result = res.data
      console.log(`register result = ${JSON.stringify(result)}`)
      if (result.statusCode === 200) {
        showToast(result.message)

        // 重置欄位
        name.value = ''
        email.value = ''
        password.value = ''
        confirmPassword.value = ''
      } else {
        showToast('註冊失敗')
      }
    } catch (e) {
      console.log(e)
      showToast('註冊失敗')
    } finally {
      hideLoading()
    }
  } else {
    showToast('請填寫必填欄位！')
  }
}

// 註冊
/* 
async function register() {
  if (
    name.value !== '' &&
    email.value !== '' &&
    password.value !== '' &&
    confirmPassword.value !== ''
  ) {
    let data = {
      name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    }

    try {
      showLoading()
      const res = await store.apiRegister(data)
      const result = res.data
      console.log(`register result = ${JSON.stringify(result)}`)
      if (result.statusCode === 201) {
        store.saveUserDataToLocalStorage({
          token: result.user.token,
          id: result.user.id,
          name: result.user.name,
          googleId: result.user.googleId,
          avatar: result.user.avatar
        })

        router.push('/')
        showToast('註冊成功')
      } else {
        showToast('註冊失敗')
      }
    } catch (e) {
      console.log(e)
      showToast('註冊失敗')
    } finally {
      hideLoading()
    }
  } else {
    showToast('請填寫必填欄位！')
  }
}
*/
</script>

<template>
  <div class="login flex min-h-screen w-full items-center justify-center pb-[60px] sm:pb-[20px]">
    <div
      class="custom-border-2 mx-5 flex w-full max-w-[880px] flex-col gap-5 px-[48px] py-[70px] md:grid md:grid-cols-2 md:gap-12"
      style="box-shadow: -8px 8px 0px #00040029; background: #efece7"
    >
      <div class="m-auto w-[60%] md:w-full">
        <img src="~/assets/images/welcome.svg" alt="" class="pic-auto" />
      </div>
      <div class="text-center">
        <div class="paytone-one-regular text-primary text-[48px] font-bold md:text-[60px]">
          Chat!
        </div>
        <div class="text-[20px] font-bold md:text-[24px]">註冊</div>
        <input
          v-model="name"
          type="text"
          class="custom-input mt-9"
          placeholder="暱稱"
          @blur="checkName"
        />
        <div v-if="checkNameError" class="mt-1 text-left text-red-500">暱稱至少 2 個字元以上</div>

        <input
          v-model="email"
          type="text"
          class="custom-input mt-4"
          placeholder="Email"
          @blur="checkEmail"
        />
        <div class="mt-1 text-left text-red-500" v-if="checkEmailError">
          {{ checkEmailErrorMessage }}
        </div>
        <input
          v-model="password"
          type="password"
          class="custom-input mt-4"
          placeholder="Password"
          @blur="checkPassword"
        />
        <div v-if="checkPasswordError" class="mt-1 text-left text-red-500">
          密碼需至少 8 碼以上，並中英混合
        </div>
        <input
          v-model="confirmPassword"
          type="password"
          class="custom-input mt-4"
          placeholder="Password"
          @blur="checkConfirmPassword"
        />
        <div v-if="checkConfirmPasswordError" class="mt-1 text-left text-red-500">
          兩次輸入密碼不同，請重新輸入
        </div>

        <button
          v-if="
            !checkEmailError &&
            !checkPasswordError &&
            !checkConfirmPasswordError &&
            !checkNameError &&
            name !== '' &&
            email !== '' &&
            password !== '' &&
            confirmPassword !== ''
          "
          class="custom-btn-primary mt-8 w-full rounded-lg"
          @click="registerVerifyEmail()"
        >
          註冊
        </button>
        <button v-else class="custom-btn-disabled mt-8 w-full rounded-lg">註冊</button>

        <div class="mt-4 flex flex-col items-center justify-center gap-4 lg:flex-row">
          <NuxtLink to="/login" class="custom-link transform duration-200"
            >我有帳號，前往登入</NuxtLink
          >
          <span class="hidden text-gray-400 lg:block">|</span>
          <NuxtLink to="/" class="custom-link transform duration-200">回首頁繼續當訪客</NuxtLink>
        </div>
      </div>
    </div>
    <Footer />
  </div>
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
