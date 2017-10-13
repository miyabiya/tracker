<template>
  <v-toolbar fixed dark class="amber lighten-1" dark>
    <v-toolbar-title class="mr-4">
      <span
      class="home"
      @click="navigateTo({name: 'root'})"
      >Tracker</span>
    </v-toolbar-title>

    <v-toolbar-items>
        <v-btn flat
               dark
               @click="navigateTo({name: 'songs'})">Browse</v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>
    <v-toolbar-items>
        <v-btn v-if="!$store.state.isUserLoggedIn"
               flat
               dark
               @click="navigateTo({name: 'login'})">Login</v-btn>
        <v-btn v-if="!$store.state.isUserLoggedIn"
               flat
               dark
               @click="navigateTo({name: 'register'})">
          Sign up
        </v-btn>
        <v-btn v-if="$store.state.isUserLoggedIn"
               flat
               dark
               @click="logout">
          Logout
        </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
      console.log(this.$touter)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      // @TODO redirect home page
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}
.home:hover {
  opacity: 0.5;
}
</style>
