<template>
  <header class="header">
    <h1>Newsletter Links</h1>
  </header>
  <router-view class="main" />
  <footer class="footer">
    <button type="button" @click="resetTokens">Reset</button>
  </footer>
</template>

<script>
import store from '@/store'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['requestToken', 'accessToken', 'username'])
  },

  methods: {
    resetTokens () {
      store.dispatch('resetTokens', this.$router)
    }
  },

  mounted () {
    console.table({
      requestToken: this.requestToken,
      accessToken: this.accessToken,
      username: this.username
    })
  }
}
</script>

<style lang="scss">
html {
  box-sizing: border-box;
  height: 100%;
}

*,
::before,
::after {
  box-sizing: inherit;
}

body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#app {
  height: 100%;
  height: -webkit-fill-available;
  display: grid;
  grid-template:
    "header" auto
    "main" 1fr
    "footer" auto
     / 100%;

}

.header {
  padding: 0 1rem;
  grid-area: header;
  border-bottom: 1px solid #aaa;
  text-align: center;
}

.main {
  padding: 0 1rem;
  grid-area: main;
  text-align: center;
  color: #2c3e50;
}

.footer {
  padding: 1rem;
  grid-area: footer;
  border-top: 1px solid #aaa;
  text-align: center;
}
</style>
