<template>
<v-layout column>
  <v-flex xs6 offset-xs3>
    <panel title="Login">
       <v-text-field
        name="email"
        label="email"
        v-model="email"
        ></v-text-field>
        <br>
        <v-text-field
        name="password"
        label="password"
        type="password"
        v-model="password"
        ></v-text-field>
        <br>
        <div class="error" v-html="error" />
        <br>
        <v-btn class="amber lighten-1" @click="login" dark>Login</v-btn>
    </panel>
  </v-flex>
</v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/Panel'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  mounted () {
    // setTimeout(() => {
    //   this.email = 'hello world'
    // }, 2000)
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
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
.error {
  color: red;
}
</style>
