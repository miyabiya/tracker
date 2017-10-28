import Api from '@/services/Api'

export default {
  // /songs -> all songs
  // /songs/:id -> a song detail in songs
  index (bookmark) {
    return Api().get('bookmarks', {
      params: bookmark
    })
  },
  post (bookmark) {
    return Api().post('bookmarks', {
      params: bookmark
    })
  },
  delete (bookmarkId) {
    return Api().delete(`bookmarks/${bookmarkId}`)
  }
}
