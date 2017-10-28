<template>
  <panel title="Search">
    <v-text-field
        name="search"
        label="Search by artist, album, genre,etc.."
        v-model="search"
    ></v-text-field>
  </panel>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search: _.debounce(async function (val) {
      const route = {
        name: 'songs'
      }
      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }
      this.$router.push(route)
      console.log(val)
    }, 700),
    '$route.query.search': {
      immediate: true,
      handler (val) {
        this.search = val
      }
    }
  }
}
</script>

<style>

</style>
