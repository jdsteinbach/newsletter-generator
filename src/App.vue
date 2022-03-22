<template>
  <header class="header">
    <h1>Newsletter Links</h1>
  </header>
  <router-view class="main" />
  <footer class="footer">
    <button type="button" @click="logOut">Log Out</button>
  </footer>
</template>

<script>
import store from '@/store'

export default {
  methods: {
    logOut () {
      store.dispatch('resetTokens', this.$router)
    }
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
  text-align: center;
  background: #455A64;
  color: #fff;
}

.main {
  margin: 0 auto;
  padding: 0 1rem;
  max-width: 30rem;
  grid-area: main;
  text-align: center;
  color: #2c3e50;
}

.footer {
  padding: 1rem;
  grid-area: footer;
  border-top: 1px solid #90A4AE;
  text-align: center;
}

.button,
button {
  padding: 1em 2em;
  display: inline-flex;
  align-items: center;
  text-align: center;
  background-color: #5C6BC0;
  color: #fff;
  border: 0;
  border-radius: .25rem;
  font-size: 1rem;
  font-family: inherit;
  font-weight: normal;
  line-height: 1;
  text-decoration: none;
  appearance: none;

  &:hover,
  &:active {
    background-color: #3949AB;
  }

  &:focus {
    outline: .125em solid #3949AB;
    outline-offset: .125em;
  }
}

.button.danger,
button.danger {
  background-color: #E53935;

  &:hover,
  &:active {
    background-color: #C62828;
  }

  &:focus {
    outline: .125em solid #C62828;
  }
}
</style>
