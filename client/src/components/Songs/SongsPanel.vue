<template>
  <panel title="Songs">
    <v-btn
    :to="{name: 'songs-create'}"
    slot="action"
    fab
    light
    medium
    absolute
    right
    middle
    >
      <v-icon>
      add
      </v-icon>
    </v-btn>
    <div class="song"
          v-for="song in songs"
          :key="song.id">
          <v-layout>
            <v-flex xs6>
              <div class="song-title">
                {{song.title}}
              </div>
              <div class="song-artist">
                {{song.artist}}
              </div>
              <div class="song-genre">
                {{song.genre}}
              </div>
              <v-btn
              class="amber lighten-1"
              :to="{
                name: 'song',
                params: {
                  songId: song.id
                }
              }"
              dark>more</v-btn>
            </v-flex>
            <v-flex xs6>
              <img :src="song.albumImageUrl" class="album-image" />
            </v-flex>
          </v-layout>
    </div>
  </panel>
</template>

<script>
import SongsService from '@/services/SongsService'

export default {
  data () {
    return {
      songs: null
    }
  },
  props: [
    'song'
  ],
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (val) {
        this.songs = (await SongsService.index(val)).data
      }
    }
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
