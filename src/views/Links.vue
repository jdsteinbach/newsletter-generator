<template>
  <div class="links">
    <template v-if="accessToken">
      <p>Links List</p>
    </template>
    <template v-else>
      <p>Loading&hellip;</p>
    </template>
  </div>
</template>

<script>
import store from '@/store'
import { mapState } from 'vuex'

export default {
  name: 'Links',

  computed: {
    ...mapState(['requestToken', 'accessToken', 'username']),

    params () {
      return JSON.stringify(this.$route.query, null, 2)
    }
  },

  mounted () {
    store.dispatch('authorize')
  }
}
</script>
