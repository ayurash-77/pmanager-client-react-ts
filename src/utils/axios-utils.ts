import axios from 'axios'
import { apiBaseUrl } from '../constants/env'

const client = axios.create({ baseURL: apiBaseUrl })

export const axiosRequest = ({ ...options }) => {
  const authUser = JSON.parse(localStorage.getItem('authUser'))
  client.defaults.headers.common.Authorization = `Bearer ${authUser.token}`
  const onSuccess = response => response
  const onError = error => {
    console.log('Error:', error.response.data)
    return error
  }

  return client(options).then(onSuccess).catch(onError)
}
