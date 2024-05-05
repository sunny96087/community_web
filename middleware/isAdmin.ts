// middleware/auth.ts
// import { useNuxtApp } from '#app'
// import { useRouter } from 'vue-router'
// import { useStore } from 'pinia/vue'
import { APIStore } from '~/store/apiService'

export default async function isAdmin() {
  const nuxtApp = useNuxtApp()
  const router = useRouter()
  // 使用 useStore 方法來訪問 APIStore
  const store = APIStore()
  console.log(`store isLoggedIn = ${JSON.stringify(store.isLoggedIn)}`)

  if (!store.isLoggedIn) {
    // 如果用戶未登入，則重定向到登入頁面
    return router.push('/login')
  }

  if (!store.userInfo?.isAdmin) {
    // 如果用戶不是管理員，則重定向到首頁
    return router.push('/')
  }

  console.log(`通過驗證`)
}
