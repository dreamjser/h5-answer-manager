import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserInfo } from '@/common/store/user_info_reducer'

export const useLoginInfo = () => {
  const info = useSelector((state: any) => state.userInfo.info)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserInfo())
  }, [])

  return info
}
