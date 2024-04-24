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
      //     refreshToken: ''
      //   }
    }
  },
  actions: {
    // 新增單筆文章
    async apiAddPost(data: JsonObject) {
      try {
        return await axios.post(`${this.api}posts`, data)
      } catch (e) {
        console.log(`apiAddPost error`, e)
        return e
      }
    },
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
