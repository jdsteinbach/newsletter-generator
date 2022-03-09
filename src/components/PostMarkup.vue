<template>
  <h3>
    <a :href="url">{{ title }}</a>
  </h3>
  <p>{{ excerpt }}</p>
  <p>
    <a :href="url">Read More&hellip;</a>
  </p>
</template>

<script>
export default {
  name: 'PostMarkup',
  props: {
    item_id: String,
    title: String,
    url: String,
    excerpt: String
  }
}
</script>

<style lang="scss" scoped>
h3 {
  margin: 0;
}
p {
  margin: 0.5rem 0 0;
}
</style>
