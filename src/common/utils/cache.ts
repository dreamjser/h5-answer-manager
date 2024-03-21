export const USERINFO_CACHE_KEY = '__userinfo__'

export const setCache = (key: string, value: any) => {
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }

  localStorage.setItem(key, value)
}

export const getCache = (key: string) => {
  const data: any = localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
