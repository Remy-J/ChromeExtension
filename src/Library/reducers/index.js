import api from './api'
import { combineReducers } from 'redux'
import data from './data'
import toasts from './toasts'
import user from './user'

// On crée le reducer consolidé…
const coreReducer = combineReducers({
  user,
  api,
  toasts,
  data,
})

export default coreReducer
