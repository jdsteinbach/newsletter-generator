<template>
  <header class="header">
    <h1>Newsletter Links</h1>
  </header>
  <router-view class="main" />
  <footer>
    <table>
      <tr>
        <th>requestToken</th>
        <td>{{ requestToken }}</td>
      </tr>
      <tr>
        <th>accessToken</th>
        <td>{{ accessToken }}</td>
      </tr>
      <tr>
        <th>username</th>
        <td>{{ username }}</td>
      </tr>
    </table>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['requestToken', 'accessToken', 'username'])
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
  grid-area: header;
  border-bottom: 1px solid #aaa;
  text-align: center;
}

.main {
  grid-area: main;
  text-align: center;
  color: #2c3e50;
}

.footer {
  grid-area: footer;
  border-top: 1px solid #aaa;
  text-align: center;
}

table {
  font-family: SF Mono, monospace;
  font-size: 0.875rem;
  opacity: 0.8;
}

th {
  text-align: right;
}

</style>
