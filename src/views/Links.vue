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
          <button @click="copyNewsletter">Copy Markup</button>
        </div>
        <ul id="content">
          <li v-for="l in links" :key="l.item_id">
            {{ l.title }}
            <a :href="l.url" target="_blank" rel="noopener noreferrer nofollow">
              <span class="sr-only">Open link in browser</span>
              <OpenIcon viewBox="0 0 16 16" aria-hidden focusable="false" role="presentation" />
            </a>
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
import OpenIcon from 'bootstrap-icons/icons/box-arrow-up-right.svg'

export default {
  name: 'Links',

  components: {
    OpenIcon
  },

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

li {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
}

a {
  color: #1976D2;

  &:hover {
    color: #0D47A1;
  }

  :visited & {
    color: #9C27B0;
  }

  svg {
    height: 1rem;
    width: 1rem;
  }

  * {
    fill: currentColor;
  }
}

.sr-only {
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  word-wrap: normal !important;
}
</style>
