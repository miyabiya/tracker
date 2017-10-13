<template>
<v-layout column>
  <v-flex xs6 offset-xs3>
    <panel title="Register">
      <form
        name="tracker-form"
        autocomplete="off"
      >
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
        autocomplete="new-password"
        ></v-text-field>
        </form>
        <br>
        <div class="error" v-html="error" />
        <br>
        <v-btn class="amber lighten-1" @click="register" dark>Register</v-btn>
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
  watch: {
    email (value) {
      console.log('email is changed!', value)
    }
  },
  mounted () {
    // setTimeout(() => {
    //   this.email = 'hello world'
    // }, 2000)
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
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
