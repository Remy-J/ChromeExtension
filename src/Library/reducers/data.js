const DATA_STEPS_SET = 'data/steps/set'
const DATA_OFFERS_SET = 'data/offers/set'
const DATA_ALL_SET = 'data/all/set'

export default function user(state = {}, action) {
  switch (action.type) {
    case DATA_ALL_SET:
      return { ...state, steps: action.steps, offers: action.offers }
    case DATA_STEPS_SET:
      return { ...state, steps: action.list }
    case DATA_OFFERS_SET:
      return { ...state, offers: action.list }
    default:
      return state
  }
}

export function setData(steps, offers) {
  return { type: DATA_ALL_SET, steps, offers }
}

export function setSteps(list) {
  return { type: DATA_STEPS_SET, list }
}

export function setOffers(list) {
  return { type: DATA_STEPS_SET, list }
}
