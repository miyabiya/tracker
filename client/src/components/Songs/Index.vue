<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <songs-search-panel />
      <songs-panel class="mt-2" />
    </v-flex>
  </v-layout>
</template>

<script>
import SongsPanel from './SongsPanel'
import SongsSearchPanel from './SongsSearchPanel'
import SongsService from '@/services/SongsService'

export default {
  data () {
    return {
      songs: null
    }
  },
  async mounted () {
    // do a request to backend for all songs
    this.songs = (await SongsService.index()).data
    console.log('songs data: ', this.songs)
  },
  components: {
    SongsPanel,
    SongsSearchPanel
  }
}
</script>

<style scoped>
.song {
  padding:20px;
  height: 330px;
}
.song-title {
  font-size: 30px;
}
.song-artist {
  font-size:24px;
}
.song-genre {
  font-size: 18px;
}
.album-image {
  width: 70%;
  margin: 0 auto;
}
</style>
