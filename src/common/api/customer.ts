import { CustomRequestConfig } from '../request'

export const getCustomerListOpts: CustomRequestConfig = {
  url: '/customer/getCustomerList',
  method: 'GET',
}

export const addCustomerOpts: CustomRequestConfig = {
  url: '/customer/addCustomer',
  method: 'POST',
}

export const updateCustomerOpts: CustomRequestConfig = {
  url: '/customer/updateCustomer',
  method: 'POST',
}

export const deleteCustomerOpts: CustomRequestConfig = {
  url: '/customer/deleteCustomer',
  method: 'POST',
}
