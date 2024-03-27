import { AllType } from '@dreamjser/request-axios'

export const loginOpts: AllType = {
  url: '/user/login',
  method: 'GET',
}

export const addUserOpts: AllType = {
  url: '/user/addUser',
  method: 'POST',
}

export const updateUserOpts: AllType = {
  url: '/user/updateUser',
  method: 'PUT',
}

export const deleteUserOpts: AllType = {
  url: '/user/deleteUser',
  method: 'DELETE',
}

export const getUserListOpts: AllType = {
  url: '/user/getUserList',
  method: 'GET',
}
