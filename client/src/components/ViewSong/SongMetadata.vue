<template>
  <panel title="Song Metadata">
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
            name: 'songs-edit',
            params () {
              return {songId: song.id}
            }
          }"
          dark>Edit</v-btn>

          <v-btn
          v-if="isUserLoggedIn && !bookmark"
          class="amber lighten-1"
          dark
          @click="setBookmark">Bookmark</v-btn>

          <v-btn
          v-if="isUserLoggedIn && bookmark"
          class="amber lighten-1"
          dark
          @click="unsetBookmark">UnBookmark</v-btn>
      </v-flex>
      <v-flex xs6>
        <img :src="song.albumImageUrl" class="album-image" />
        <br>
        {{song.album}}
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/Services/BookmarksService'
export default {
  props: [
    'song'
  ],
  data () {
    return {
      bookmark: null,
      bookmarkId: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  watch: {
    async song () {
      if (!this.isUserLoggedIn) {
        return
      }
      try {
        console.log(this.song.id)
        const bookmarks = (await BookmarksService.index({
          songId: this.song.id
        })).data
        console.log(bookmarks.length)
        if (bookmarks.length) {
          this.bookmark = bookmarks[0]
        }
        console.log(this.bookmark)
        // console.log(!!bookmark)
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    async setBookmark () {
      console.log(this.song.id)
      try {
        this.bookmark = (await BookmarksService.post({
          songId: this.song.id
        })).data
        console.log(this.bookmark)
      } catch (err) {
        console.log(err)
      }
      console.log('bookmarked')
    },
    async unsetBookmark () {
      try {
        this.setBookmarkbookmark = await BookmarksService.delete(this.bookmark.id)
        console.log(this.bookmark)
        this.bookmark = null
      } catch (err) {
        console.log(err)
      }
      console.log('unbookmarked')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
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
