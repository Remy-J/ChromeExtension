import Core from './Core'

export default class Users extends Core {
  find(search) {
    return this.get('/users', search)
  }
  login(username, password) {
    return this.post('/auth/login', { username, password })
  }
  logout() {
    return this.post('/auth/logout')
  }
  create(data) {
    return this.put('/users', data)
  }
}
