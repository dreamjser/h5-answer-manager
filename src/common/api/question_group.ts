import { AllType } from '@dreamjser/request-axios'

export const addQuestionGroupOpts: AllType = {
  url: '/questionGroup/addQuestionGroup',
  method: 'POST',
}

export const updateQuestionGroupOpts: AllType = {
  url: '/questionGroup/updateQuestionGroup',
  method: 'PUT',
}

export const deleteQuestionGroupOpts: AllType = {
  url: '/questionGroup/deleteQuestionGroup',
  method: 'PUT',
}

export const getQuestionGroupListOpts: AllType = {
  url: '/questionGroup/getQuestionGroupList',
  method: 'GET',
}
