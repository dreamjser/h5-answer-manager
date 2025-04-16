import {
  HttpClient,
  RequestConfig,
  ResponseConfig,
} from '@dreamjser/http-client'
import { showLoading, hideLoading } from './loading'
import store from '@/common/store'
import { removeUserInfo } from '@/common/store/user_info_reducer'
import { USERINFO_CACHE_KEY, getCache } from '@/common/utils/cache'

export interface CustomRequestConfig extends RequestConfig {
  loading?: boolean
  hasOwnError?: boolean
}

const client = new HttpClient({
  baseURL: GLOBAL_CONFIG.BASE_URL,
  timeout: 5000,
  withCredentials: true,
})

client.useRequestInterceptor({
  onRequest: (config: CustomRequestConfig) => {
    const userInfo = getCache(USERINFO_CACHE_KEY) || {}
    const conf = {
      loading: true,
      hasOwnError: false,
      ...config,
    }

    if (conf.data) {
      conf.data = {
        ...conf.data,
        token: userInfo.token || '',
      }
    }

    if (conf.loading) {
      showLoading()
    }

    return conf
  },
})

client.useResponseInterceptor({
  onResponse: (responseConfig: ResponseConfig) => {
    const { config, response, resolve, reject } = responseConfig
    const { errorCode, errorMsg, data } =
      (response as Record<string, any>).data || {}

    if ((config as CustomRequestConfig).loading) {
      setTimeout(hideLoading, 50)
    }

    if (response.status === 403) {
      App.interface.alert('登录超时，请重新登录').then(() => {
        store.dispatch(removeUserInfo())
      })
      return
    }

    if (errorCode !== '0') {
      if (!(config as CustomRequestConfig).hasOwnError) {
        App.interface.toast(errorMsg)
      } else {
        reject({ errorCode, errorMsg, data })
      }
      return
    }

    resolve(data)
    return data
  },
  onResponseError: (error: Error) => {
    App.interface.toast('网络请求失败')
    setTimeout(hideLoading, 50)
    return error
  },
})

export default (config: CustomRequestConfig) => {
  return client.request(config)
}
