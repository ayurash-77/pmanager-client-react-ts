import axios from 'axios'
import { apiBaseUrl } from '../constants/env'

const client = axios.create({ baseURL: apiBaseUrl })

export const axiosRequest = ({ ...options }) => {
  const authUser = JSON.parse(localStorage.getItem('authUser'))
  // if (authUser && authUser.token) {
  client.defaults.headers.common.Authorization = `Bearer ${authUser.token}`
  // }
  const onSuccess = response => response
  const onError = error => {
    console.log('error:', error.message)
    return error
  }

  return client(options).then(onSuccess).catch(onError)
}
