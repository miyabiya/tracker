import Api from '@/services/Api'

export default {
  // /songs -> all songs
  // /songs/:id -> a song detail in songs
  index (params) {
    return Api().get('histories', {
      params: params
    })
  },
  post (history) {
    return Api().post('histories', history)
  }
}
