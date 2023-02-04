import { AxiosRequestConfig } from 'axios';
import qs from 'qs'
import { api } from 'src/boot/axios'

export class BaseService {
  static addQueryString(url: string, query: object = {}): string {
    return url + '?' + qs.stringify(query);
  }

  static async requestGet<T = unknown>(url: string, options: AxiosRequestConfig = {}): Promise<T> {
    const { data } = await api.get(url, options);
    return data;
  }

  static async requestPost<T = unknown>(url: string, body: object = {}, options: AxiosRequestConfig = {}): Promise<T> {
    const { data } = await api.post(url, body, options);
    return data;
  }
}
