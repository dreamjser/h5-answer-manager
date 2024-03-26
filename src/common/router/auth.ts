import routers from '@tmp/routers'
// import router from '@/portal/router_entry'
import { USERINFO_CACHE_KEY, getCache } from '@/common/utils/cache'

const getAuthInfo = (pathname: string) => {
  const routerMaps: any = {}

  routers.reduce((prev: any, current: any) => {
    prev[current.path] = current.meta
    return prev
  }, routerMaps)

  return routerMaps[pathname] || null
}

export const checkAuth = (pathname: string) => {
  const authInfo = getAuthInfo(pathname)
  const userInfo = getCache(USERINFO_CACHE_KEY)

  if (authInfo && authInfo.needLogin !== false && !userInfo) {
    App.router.push('/login', {
      query: { redirectUrl: encodeURIComponent(pathname) },
      replace: true,
    })
    return false
  }
  return true
}
