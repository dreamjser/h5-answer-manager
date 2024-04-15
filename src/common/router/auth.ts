import routers from '@tmp/routers'
import store from '@/common/store'

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
  const state = store.getState()
  const userInfo = state.userInfo.info || {}

  if (authInfo && authInfo.needLogin !== false && !userInfo) {
    App.router.push('/login', {
      query: { redirectUrl: encodeURIComponent(pathname) },
      replace: true,
    })
    return false
  }
  return true
}
