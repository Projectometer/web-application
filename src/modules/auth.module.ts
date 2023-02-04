import { BaseService } from 'src/api';
import { ApiUrl, AUTH_CALLBACK_URL } from 'src/api/api.url';

export class AuthModule {
  static async getAuthUrl(redirect_uri: string = AUTH_CALLBACK_URL): Promise<string> {
    const url = BaseService.addQueryString(ApiUrl.AUTH_SIGN_IN, {
      redirect_uri
    })
    return BaseService.requestGet<string>(url);
  }
}
