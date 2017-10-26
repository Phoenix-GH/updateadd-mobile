// @flow

import axios from 'axios'
import { Promise } from 'bluebird'
import Config from 'react-native-config'

import { modelMapper, ModelResponseTypes } from '../../models'

const BASE_URL = Config.API_URL

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
}

export default new ApiService()
