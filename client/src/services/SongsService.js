import Api from '@/services/Api'

export default {
  // /songs -> all songs
  // /songs/:id -> a song detail in songs
  index (search) {
    return Api().get('songs', {
      params: {
        search: search
      }
    })
  },
  post (song) {
    return Api().post('songs', song)
  },
  show (songId) {
    return Api().get(`songs/${songId}`)
  },
  put (song) {
    return Api().put(`songs/${song.Id}`, song)
  }
}
