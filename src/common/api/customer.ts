import { AllType } from '@dreamjser/request-axios'

export const getCustomerListOpts: AllType = {
  url: '/customer/getCustomerList',
  method: 'GET' as const,
}

export const addCustomerOpts: AllType = {
  url: '/customer/addCustomer',
  method: 'POST' as const,
}

export const updateCustomerOpts: AllType = {
  url: '/customer/updateCustomer',
  method: 'POST' as const,
}

export const deleteCustomerOpts: AllType = {
  url: '/customer/deleteCustomer',
  method: 'POST' as const,
}
