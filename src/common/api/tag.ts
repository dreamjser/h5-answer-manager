import { AllType } from '@dreamjser/request-axios'

export const addTagOpts: AllType = {
  url: '/tag/addTag',
  method: 'POST',
}

export const updateTagOpts: AllType = {
  url: '/tag/updateTag',
  method: 'PUT',
}

export const deleteTagOpts: AllType = {
  url: '/tag/deleteTag',
  method: 'PUT',
}

export const getTagListOpts: AllType = {
  url: '/tag/getTagList',
  method: 'GET',
}
