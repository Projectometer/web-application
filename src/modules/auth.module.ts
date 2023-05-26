import { BaseService } from 'src/api';
import { ApiUrl, AUTH_CALLBACK_URL } from 'src/api/api.url';
import { LocationQuery } from 'vue-router';

export class AuthModule {
  static async getAuthUrl(
    redirect_uri: string = AUTH_CALLBACK_URL
  ): Promise<string> {
    const url = BaseService.addQueryString(ApiUrl.AUTH_SIGN_IN, {
      redirect_uri,
    });
    return BaseService.requestGet<string>(url);
  }

  static checkAuthResult(query: LocationQuery): string | null {
    const { success, token } = query;
    if (Boolean(success) === true && token) {
      const clearToken = token.toString().replace(/\\\"/g, '"');
      return clearToken.substring(1, clearToken.length - 1);
    }
    return null;
  }
}
