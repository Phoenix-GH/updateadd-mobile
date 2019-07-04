// @flow

import axios from 'axios'
import Config from 'react-native-config'

import { modelMapper, ModelResponseTypes } from '../models'

const BASE_URL = Config.API_URL

const LOGIN_USER_URL = `${BASE_URL}accounts/login/`
const SIGNUP_USER_URL = `${BASE_URL}accounts/signup/`

class ApiService {
  axios: axios.Axios

  constructor() {
    this.setupInstance()
  }

  setupInstance = (token: ?string) => {
    const data = {
      headers: {
        Accept: 'application/json',
        Authorization: '',
      },
    }
    if (token) {
      data.headers.Authorization = `Token ${token}`
    }
    this.axios = axios.create(data)
    this.axios.interceptors.response.use((response) => {
      // $FlowFixMe
      if (response.config.apiResponseType) {
        // $FlowFixMe
        response.data = modelMapper(response.config.apiResponseType, response.data)
      }
      return response
    }, error => Promise.reject(error))
  }

  // General pagination endpoint
  getNextPage = (url: string, responseType: typeof ModelResponseTypes) => this.axios.get<string, any>(url, { apiResponseType: responseType })

  loginUser = (data: UserLoginPayload) => this.axios.post<string, any>(LOGIN_USER_URL, data)

  signUpUser = (data: UserSignUpPayload) => this.axios.post<string, any>(SIGNUP_USER_URL, data)
}

export default new ApiService()
