<script>
export default {
  props: {
    objContent: Object,
  },
};
</script>

<template>
  <ul>
    <li>{{ objContent.title }}</li>
    <li>{{ objContent.original_title }}</li>
    <li>{{ objContent.original_language }}</li>
    <li>{{ objContent.vote_average }}</li>
  </ul>
</template>

<style scoped>
ul {
  margin: 20px 0;
}
</style>
