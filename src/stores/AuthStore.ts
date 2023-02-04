import { defineStore } from 'pinia';

export type AuthData = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  ext_expires_in: number;
  scope: string;
  token_type: string;
  [key: string]: unknown;
}
export type ProfileData = {
  [key: string]: unknown;
}

export type AuthStore = {
  auth: null | AuthData
  profile: null | ProfileData
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthStore => ({
    auth: null,
    profile: null
  }),

  getters: {
    isLoggedIn(): boolean {
      return !!this.auth?.access_token
    }
  },

  actions: {
    setAuth(auth: AuthData) {
      this.auth = auth;
    },
    setProfile(profile: ProfileData) {
      this.profile = profile;
    },
    logout() {
      this.auth = null;
      this.profile = null;
    }
  }
  ,
  persist: true
});
