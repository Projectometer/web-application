import { defineStore } from 'pinia';
import { AuthData, AuthState, ProfileData } from 'src/types';

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        auth: null,
        profile: null,
        token: null,
    }),

    getters: {
        isLoggedIn(): boolean {
            return !!this.token;
        },
    },

    actions: {
        setAuth(auth: AuthData) {
            this.auth = auth;
        },
        setToken(token: string) {
            this.token = token;
        },
        setProfile(profile: ProfileData) {
            this.profile = profile;
        },
        logout() {
            this.auth = null;
            this.profile = null;
            this.token = null;
        },
    },
});
