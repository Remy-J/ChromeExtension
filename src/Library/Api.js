// import URL from 'url'
import localforage from 'localforage'
import qs from 'qs'

const isLocal = window.document.location.href.includes('localhost')

export default function Api(token) {
  const host = isLocal ? 'http://localhost:3666' : 'https://api.folhomee.fr'
  const universe = 'N3gKzUbMZGbRn0RsctXupGqOrVcqHqm1'

  return (method, url, params, config = {}) => {
    // On crée les entêtes
    const headers = new Headers({
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'x-universe-token': universe,
      'x-access-token': token,
    })

    const options = {
      method,
      headers,
      cache: 'default',
    }

    // On gère la transmission des données
    switch (method.toLowerCase()) {
      case 'post':
      case 'put':
        options.body = JSON.stringify(params)
        break
      default:
        url += `?${qs.stringify(params)}`
        break
    }

    return Promise.resolve()
      .then(() => fetch(host + url, options))
      .then(res => {
        // On gère le token qui a expiré
        if (res.status === 401) {
          return (
            localforage
              // On supprime le store
              .dropInstance()
              // On redirige sur la page d'accueil (login)
              .then(() => (window.location = '/'))
          )
        } else if (res.status !== 200) {
          // On récupère le contenu de la requête
          return (
            res
              .json()
              // On crée l'erreur
              .then(err => {
                console.log('ERROR', err)
                throw new Error(err.message)
              })
          )
        }

        // Si on souhaite faire un téléchargement,
        // on change la gestion
        if (config.download) {
          return (
            Promise.resolve()
              // On récupère le flux
              .then(() => res.blob())
              // On transforme ça en URL encodée
              .then(blob => URL.createObjectURL(blob))
              // On redirige sur l'URL créée
              .then(url => {
                window.open(url, '_blank')
                URL.revokeObjectURL(url)
              })
          )
        } else {
          return res.json()
        }
      })
  }
}
