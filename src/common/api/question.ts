import { CustomRequestConfig } from '../request'

export const addQuestionOpts: CustomRequestConfig = {
  url: '/question/addQuestion',
  method: 'POST',
}

export const updateQuestionOpts: CustomRequestConfig = {
  url: '/question/updateQuestion',
  method: 'PUT',
}

export const deleteQuestionOpts: CustomRequestConfig = {
  url: '/question/deleteQuestion',
  method: 'PUT',
}

export const getQuestionListOpts: CustomRequestConfig = {
  url: '/question/getQuestionList',
  method: 'GET',
}
