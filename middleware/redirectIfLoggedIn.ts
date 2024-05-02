// middleware/redirectIfLoggedIn.ts
// 好像沒用 xd
import { useNuxtApp } from '#app'
import { useRouter } from 'vue-router'
import { APIStore } from '~/store/apiService'

export default async function redirectIfLoggedIn() {
 const nuxtApp = useNuxtApp()
 const router = useRouter()
 // 使用 useStore 方法來訪問 APIStore
 const store = APIStore()

 // 檢查用戶是否已經登入
 if (store.isLoggedIn) {
    // 如果用戶已經登入，則重定向到首頁
    return router.push('/')
 }
}