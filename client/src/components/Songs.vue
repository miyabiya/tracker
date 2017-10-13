<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Songs">
        <v-btn
        @click="navigateTo({name: 'songs-create'})"
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
                 @click="navigateTo({
                   name: 'song',
                   params: {
                     songId: song.id
                   }
                 })"
                   dark>more</v-btn>
               </v-flex>
               <v-flex xs6>
                 <img :src="song.albumImageUrl" class="album-image" />
               </v-flex>
             </v-layout>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import SongsService from '@/services/SongsService'
import Panel from '@/components/Panel'

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
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  components: {
    Panel
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
