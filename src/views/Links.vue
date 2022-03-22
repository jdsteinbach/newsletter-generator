<template>
  <div class="links">
    <h2>Links List</h2>

    <template v-if="areLinksArchived">
      <div class="errors" v-if="archiveErrorsText">
        {{ archiveErrorsText }}
      </div>
      <p>Links were successfully updated. Get more?</p>
      <div class="button-holder">
        <button @click="getLinks">Get More Links</button>
      </div>
    </template>

    <template v-else-if="isLoading">
      <p>Loading&hellip;</p>
    </template>

    <template v-else>
      <template v-if="linksText">
        <div class="button-holder">
          <button @click="archiveLinks" class="danger">Archive Links</button>
          <button @click="copyNewsletter">Copy Text</button>
        </div>
        <ul id="content">
          <li v-for="l in links" :key="l.item_id">
            {{ l.title }}
          </li>
        </ul>
      </template>

      <template v-else>
        <p>Sorry, no links were found.</p>
      </template>
    </template>

  </div>
</template>

<script>
import store from '@/store'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Links',

  computed: {
    ...mapGetters([
      'linksText',
      'areLinksArchived',
      'archiveErrorsText'
    ]),

    ...mapState([
      'accessToken',
      'links',
      'isLoading',
      'isArchiving'
    ]),

    params () {
      return JSON.stringify(this.$route.query, null, 2)
    }
  },

  mounted () {
    if (this.accessToken) {
      this.getLinks()
    } else {
      store.dispatch('getAccessToken')
    }
  },

  methods: {
    async copyNewsletter () {
      await navigator.clipboard.writeText(this.linksText)
    },

    archiveLinks () {
      store.dispatch('archiveLinks')
    },

    getLinks () {
      store.dispatch('getLinks')
    }
  }
}
</script>

<style lang="scss">
ul {
  margin: 0 auto;
  padding: 1rem 0;
  text-align: left;

  li {
    margin: 1rem 0 0;
  }
}

.button-holder {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
}
</style>
