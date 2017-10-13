import Api from '@/services/Api'

export default {
  // /songs -> all songs
  // /songs/:id -> a song detail in songs
  index () {
    return Api().get('songs')
  },
  post (song) {
    return Api().post('songs', song)
  }
}
