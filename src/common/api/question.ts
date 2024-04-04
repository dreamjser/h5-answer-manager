import { AllType } from '@dreamjser/request-axios'

export const addQuestionOpts: AllType = {
  url: '/question/addQuestion',
  method: 'POST',
}

export const updateQuestionOpts: AllType = {
  url: '/question/updateQuestion',
  method: 'PUT',
}

export const deleteQuestionOpts: AllType = {
  url: '/question/deleteQuestion',
  method: 'PUT',
}

export const getQuestionListOpts: AllType = {
  url: '/question/getQuestionList',
  method: 'GET',
}
