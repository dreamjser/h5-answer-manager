import { CustomRequestConfig } from '../request'

export const addTagOpts: CustomRequestConfig = {
  url: '/tag/addTag',
  method: 'POST',
}

export const updateTagOpts: CustomRequestConfig = {
  url: '/tag/updateTag',
  method: 'PUT',
}

export const deleteTagOpts: CustomRequestConfig = {
  url: '/tag/deleteTag',
  method: 'PUT',
}

export const getTagListOpts: CustomRequestConfig = {
  url: '/tag/getTagList',
  method: 'GET',
}
