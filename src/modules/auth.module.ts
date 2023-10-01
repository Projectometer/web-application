import { AUTH_CALLBACK_URL, BaseService } from 'src/api';
import ApiUrl from 'src/api/api.url';
import { LocationQuery } from 'vue-router';

export class AuthModule {
    static async getAuthUrl(): Promise<string> {
        const url = BaseService.addQueryString(ApiUrl['signIn'], {
            redirect_to: AUTH_CALLBACK_URL,
        });
        return BaseService.requestPost<string>(url);
    }

    static checkAuthResult(query: LocationQuery): string | null {
        const { token } = query;
        if (token) {
            return token + '';
        }
        return null;
    }
}
