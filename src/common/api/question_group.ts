import { CustomRequestConfig } from '../request'

export const addQuestionGroupOpts: CustomRequestConfig = {
  url: '/questionGroup/addQuestionGroup',
  method: 'POST',
}

export const updateQuestionGroupOpts: CustomRequestConfig = {
  url: '/questionGroup/updateQuestionGroup',
  method: 'PUT',
}

export const deleteQuestionGroupOpts: CustomRequestConfig = {
  url: '/questionGroup/deleteQuestionGroup',
  method: 'PUT',
}

export const getQuestionGroupListOpts: CustomRequestConfig = {
  url: '/questionGroup/getQuestionGroupList',
  method: 'GET',
}
