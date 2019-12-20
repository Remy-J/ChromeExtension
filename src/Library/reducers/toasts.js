const TOASTS_ADD = 'toasts/add'
const TOASTS_SHOWED = 'toasts/showed'

export default function toasts(toasts = [], { type, data }) {
  switch (type) {
    case TOASTS_ADD:
      // On vérifie si le toast existe déjà ou non
      const uniq = toasts.find(t => t.key === data.key)

      // Si c'est un nouveau toast, on le crée
      if (!uniq) {
        return [...toasts, data]
      }

      // Sinon, on se contente de retourner la liste
      return toasts
    case TOASTS_SHOWED:
      const keys = data.map(t => t.key)
      // On supprime les toasts indiqués ou ceux qui sont trop vieux
      return toasts.filter(t => !keys.includes(t.key))
    default:
      return toasts
  }
}

// Méthode pour créer un nouveau toast
export function add({ type = 'warning', title, text, date = Date.now() }) {
  return { type: TOASTS_ADD, data: { key: date, type, title, text, date } }
}

// Méthode pour masquer des toasts
export function showed(list) {
  return { type: TOASTS_SHOWED, data: list }
}
