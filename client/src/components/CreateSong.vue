<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Song Metadata">
        <v-text-field
          label="Title"
          required
          :rules="[required]"
          v-model="song.title"
          ></v-text-field>
          <v-text-field
          label="Artist"
          required
          :rules="[required]"
          v-model="song.artist"
          ></v-text-field>
          <v-text-field
          label="Genre"
          required
          :rules="[required]"
          v-model="song.genre"
          ></v-text-field>
          <v-text-field
          label="Album"
          required
          :rules="[required]"
          v-model="song.album"
          ></v-text-field>
          <v-text-field
          label="Album Image Url"
          required
          :rules="[required]"
          v-model="song.albumImageUrl"
          ></v-text-field>
          <v-text-field
          label="Youtube Id"
          required
          :rules="[required]"
          v-model="song.youtubeId"
          ></v-text-field>
      </panel>
    </v-flex>

    <v-flex xs8>
      <panel title="Song sub data" class="ml-2">
        <v-text-field
          label="Lyrics"
          multi-line
          required
          :rules="[required]"
          v-model="song.lyrics"
          ></v-text-field>
          <v-text-field
          label="Tab"
          multi-line
          required
          :rules="[required]"
          v-model="song.tab"
          ></v-text-field>
      </panel>
      <div class="danger-alert" v-if="error">
        {{error}}
      </div>
      <v-btn class="amber lighten-1" @click="create" dark>Create a song</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import SongService from '@/services/SongsService'
export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      error: null,
      required: (value) => !!value || '必須'
    }
  },
  methods: {
    async create () {
      this.error = null
      const allFieldsIn = Object
      .keys(this.song)
      .every(key => !!this.song[key])
      if (!allFieldsIn) {
        this.error = '全てのフィールドに入力してください'
        return
      }
      try {
        await SongService.post(this.song)
        this.$router.push({
          name: 'songs'
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  components: {
    Panel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
