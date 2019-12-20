/*global chrome*/
// permet d'utiliser l'API de chrome
import React, { Component, useRef } from 'react'
import './Search.css'
import UsersService from '../../Library/services/Users'

function handleSubmit(evt, username, password) {
  evt.preventDefault()
  const service = new UsersService()

  return (
    service
      // On lance le login
      .login(username, password)
      // On transmet les infos au callback
      .then(data => console.log(data))
  )
}

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      url: '',
      crawlers: {},
      usernameRef: null,
      passwordRef: null,
    }
  }

  render() {
    return (
      <form
        style={{ marginLeft: 'auto', marginRight: 'auto' }}
        onSubmit={e =>
          handleSubmit(
            e,
            this.state.usernameRef,
            this.state.passwordRef
          )
        }
      >
        <label>
          <input
            type="text"
            onChange={e => this.setState({ usernameRef: e.target.value })}
            name="username"
          />
          <input
            type="password"
            onChange={e => this.setState({ passwordRef: e.target.value })}
            name="password"
          />
        </label>
        <button type="submit">Login</button>
      </form>
    )
  }
}

export default Login
