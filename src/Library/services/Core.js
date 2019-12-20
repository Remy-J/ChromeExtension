import Api from '../Api'

export default class Core {
  constructor(token) {
    this.setToken(token)
  }

  setToken(token) {
    this.token = token
  }

  request(method, url, data, options) {
    return Api(this.token)(method, url, data, options)
  }
  get(url, data, options) {
    return this.request('get', url, data, options)
  }
  post(url, data, options) {
    return this.request('post', url, data, options)
  }
  put(url, data, options) {
    return this.request('put', url, data, options)
  }
  delete(url, data, options) {
    return this.request('delete', url, data, options)
  }
}
