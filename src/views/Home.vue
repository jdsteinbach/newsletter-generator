<template>
  <div class="home">
    <p>Login in to access your links list.</p>
    <p v-if="requestToken">
      <a :href="loginURL">Login</a>
    </p>
  </div>
</template>

<script>
import store from '@/store'
import { mapState } from 'vuex'

export default {
  name: 'Home',

  computed: {
    ...mapState(['requestToken']),

    loginURL () {
      return `https://getpocket.com/auth/authorize?request_token=${this.requestToken}&redirect_uri=${process.env.VUE_APP_REDIRECT_URI}/links`
    }
  },

  mounted () {
    store.dispatch('getToken')
  }
}
</script>
