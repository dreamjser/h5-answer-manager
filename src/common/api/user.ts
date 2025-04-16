import { CustomRequestConfig } from '../request'

export const loginOpts: CustomRequestConfig = {
  url: '/user/login',
  method: 'GET',
}

export const addUserOpts: CustomRequestConfig = {
  url: '/user/addUser',
  method: 'POST',
}

export const updateUserOpts: CustomRequestConfig = {
  url: '/user/updateUser',
  method: 'PUT',
}

export const deleteUserOpts: CustomRequestConfig = {
  url: '/user/deleteUser',
  method: 'PUT',
}

export const getUserListOpts: CustomRequestConfig = {
  url: '/user/getUserList',
  method: 'GET',
}
