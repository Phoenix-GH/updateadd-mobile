// @flow

import axios from 'axios'
import Config from 'react-native-config'

import { modelMapper, ModelResponseTypes } from '../../models'

const BASE_URL = Config.API_URL

const LOGIN_USER_URL = `${BASE_URL}/auth/login/`

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
      if (response.config.apiResponseType) {
        response.data = modelMapper(response.config.apiResponseType, response.data)
      }
      return response
    }, error => Promise.reject(error))
  }

  // General pagination endpoint
  getNextPage = (url: string, responseType: typeof ModelResponseTypes) => this.axios.get(url, { apiResponseType: responseType })

  loginUser(data: { email: string, password: string }): Promise<UserType> {
    return new Promise((resolve, reject) => this.axios({
      method: 'post',
      url: LOGIN_USER_URL,
      data,
    }).then((response) => {
      // $FlowFixMe
      const user: UserType = response.data
      resolve(user)
    }).catch((err) => {
      reject(err)
    }))
  }
}

export default new ApiService()
