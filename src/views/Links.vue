<template>
  <div class="links">
    <template v-if="accessToken">
      <h2>Links List</h2>
      <template v-if="links.length">
        <button @click="copyNewsletter">Copy Newsletter</button>
        <div id="content" class="copyable-links" contenteditable="true">
          <template v-for="(post, index) in links" :key="post.item_id">
            <hr v-if="index > 0" />
            <PostMarkup v-bind="post" />
          </template>
        </div>
      </template>
      <template v-else>
        Loading Links&hellip;
      </template>
    </template>
    <template v-else>
      <p>Loading&hellip;</p>
    </template>
  </div>
</template>

<script>
import store from '@/store'
import { mapState } from 'vuex'

import PostMarkup from '@/components/PostMarkup'

export default {
  name: 'Links',

  components: {
    PostMarkup
  },

  computed: {
    ...mapState(['links', 'accessToken']),

    params () {
      return JSON.stringify(this.$route.query, null, 2)
    }
  },

  mounted () {
    if (this.accessToken) {
      store.dispatch('getLinks')
    } else {
      store.dispatch('getAccessToken')
    }
  },

  methods: {
    async copyNewsletter () {
      const content = document.getElementById('content').innerHTML

      await navigator.clipboard.writeText(content)
    }
  }
}
</script>

<style lang="scss" scoped>
.copyable-links {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #666;
  background-color: #eee;
  text-align: left;
}

hr {
  margin: 1rem 0;
}
</style>
