import type { JsonObject } from 'type-fest'
import { defineStore } from 'pinia'
import axios from 'axios'

const obj: JsonObject = {
  name: 'John',
  age: 30
}

export const APIStore = defineStore({
  id: 'api-store',
  state: () => {
    return {
      // 開發
      api: 'http://localhost:3666/'

      // 線上
      // api: "https://express-community.onrender.com/",

      //   userInfo: null as JsonObject | null,
      //   tokenInfo: {
      //     token: '',
      //   }
    }
  },
  actions: {
    // 取得所有文章
    async apiGetPost(data: JsonObject) {
      try {
        return await axios.get(
          `${this.api}posts?sort=${data.sort}&keyword=${data.keyword}&userId=${data.userId ? data.userId : ''}`
        )
      } catch (e) {
        console.log(`apiGetPost error`, e)
        return e
      }
    },
    // ? 取得所有文章
    async apiGetSpecifyUser(data: JsonObject) {
      try {
        return await axios.get(`${this.api}users/${data.userId}`)
      } catch (e) {
        console.log(`apiGetPost error`, e)
        return e
      }
    },
    // 新增單筆文章
    async apiAddPost(data: JsonObject) {
      try {
        return await axios.post(`${this.api}posts`, data)
      } catch (e) {
        console.log(`apiAddPost error`, e)
        return e
      }
    },
    // 新增單筆文章留言
    async apiAddPostComment(data: JsonObject) {
      try {
        return await axios.post(`${this.api}posts/comments/${data.postId}`, data)
      } catch (e) {
        console.log(`apiAddPostComment error`, e)
        return e
      }
    },
    // 指定文章按讚
    async apiLikePost(data: JsonObject) {
      try {
        return await axios.patch(`${this.api}posts/like/${data.postId}`, data)
      } catch (e) {
        console.log(`apiAddPostComment error`, e)
        return e
      }
    },
    // 註冊
    async apiRegister(data: JsonObject) {
      try {
        return await axios.post(`${this.api}users/sign_up`, data)
      } catch (e) {
        console.log(`register error`, e)
        return e
      }
    },
    // 登入
    async apiLogin(data: JsonObject) {
      return await axios.post(`${this.api}users/sign_in`, data)
      // try {
      // } catch (e) {
      //   console.log(`login error`, e)
      //   return e
      // }
    },
    // google 登入 || 註冊
    async apiGoogleLogin() {
      return await axios.get(`${this.api}users/google`)
    },

    // 存使用者登入資料
    saveUserDataToLocalStorage(data: {
      token: string
      id: string
      name: string
      googleId: string
    }) {
      // 將資料轉化為 JSON 字符串
      const userInfo = JSON.stringify(data)

      console.log(`userInfo = ${userInfo}`)

      // 存儲 userInfo 至 localStorage
      localStorage.setItem('userInfo', userInfo)
    },
    // 取使用者 token
    getToken() {
      return localStorage.getItem('token')
    },
    getUserInfoFromLocalStorage() {
      // 從 localStorage 取出 userInfo 字符串
      const userInfoString = localStorage.getItem('userInfo')
      // 將字符串反序列化為 JavaScript 對象
      const userInfo = userInfoString ? JSON.parse(userInfoString) : null
      return userInfo
    },

    // 登出方法，移除 localStorage 中的資訊
    logout() {
      // 直接移除名為 'userInfo' 的項目
      localStorage.removeItem('userInfo')
    }

    /** 
      async getRSAKey() {
        try {
          return await axios.get(`${this.api}users/key`);
        } catch (e) {
          console.log(`getRSAKey error `, e);
          return e;
        }
      },
      async getVersionInfo() {
        try {
          return await axios.get(`${this.api}users/version`);
        } catch (e) {
          console.log(`getVersionInfo error `, e);
          return e;
        }
      },
      // 註冊
      async register(data: JsonObject) {
        try {
          return await axios.post(`${this.api}users/register`, data);
        } catch (e) {
          console.log(`register error`, e);
          return e;
        }
      },
      // 登入
      async login(data: JsonObject) {
        try {
          return await axios.post(`${this.api}users/login`, data);
        } catch (e) {
          console.log(`login error`, e);
          return e;
        }
      },
      // 取會員資料
      async loadUserProfile() {
        try {
          const user = this.getCacheUser();
          console.log(`getCacheUser = ${JSON.stringify(user)}`);
          return await axios.get(`${this.api}users/info`, {
            headers: {
              token: user ? (user!.token as string) : "",
            },
          });
        } catch (e) {
          console.log(`loadUserProfile error`, e);
          return e;
        }
      },
      async loadUserProfileWithToken(token: string) {
        try {
          console.log(`loadUserProfileWithToken = ${JSON.stringify(token)}`);
          return await axios.get(`${this.api}users/info`, {
            headers: {
              token: token,
            },
          });
        } catch (e) {
          console.log(`loadUserProfile error`, e);
          return e;
        }
      },
      // 取得使用紀錄
      async loadActionLogList(data: JsonObject) {
        try {
          const user = this.getCacheUser();
          return await axios.post(`${this.api}users/record/list`, data, {
            headers: {
              token: user ? (user!.token as string) : "",
            },
          });
        } catch (e) {
          console.log(`loadActionLogList error`, e);
          return e;
        }
      },
      async googleLogin() {
        try {
          return await axios.post(`${this.api}google/login`);
        } catch (e) {
          console.log(`googleLogin error`, e);
          return e;
        }
      },
    */
  },
  getters: {
    //   getUserInfo: (state) => state.userInfo,
  }
})
