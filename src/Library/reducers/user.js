const USER_STATE_DISCONNECTED = 'user/state/disconnected'
const USER_STATE_CONNECTED = 'user/state/connected'
const USER_STATE_PENDING = 'user/state/pending'

export default function user(state = {}, action) {
  switch (action.type) {
    case USER_STATE_DISCONNECTED:
      return { ...state, state: 'disconnected' }
    case USER_STATE_CONNECTED:
      return {
        ...state,
        state: 'connected',
        id: action.data.user.id,
        token: action.data.token,
        username: action.data.user.username,
        widgets: action.data.user.widgets || [
          'tickets',
          'customer_stats',
          'maintenance_crawler',
          'customer_graph',
          'job_scrap',
          'addcrawler',
        ],
      }
    case USER_STATE_PENDING:
      return { ...state, state: 'pending' }
    default:
      return state
  }
}

export function connectUser(data) {
  return { type: USER_STATE_CONNECTED, data }
}

export function logout() {
  return { type: USER_STATE_DISCONNECTED }
}
