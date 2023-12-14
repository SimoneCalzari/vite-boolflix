<script>
export default {
  props: {
    objContent: Object,
    isObjWhat: String,
  },
  methods: {
    seriesOrMovie1() {
      if (this.isObjWhat === "film") {
        return this.objContent.title;
      }
      return this.objContent.name;
    },
    seriesOrMovie2() {
      if (this.isObjWhat === "film") {
        return this.objContent.original_title;
      }
      return this.objContent.original_name;
    },
  },
};
</script>

<template>
  <ul>
    <li>{{ seriesOrMovie1() }}</li>
    <li>{{ seriesOrMovie2() }}</li>
    <li>{{ objContent.original_language }}</li>
    <li>{{ objContent.vote_average }}</li>
  </ul>
</template>

<style scoped>
ul {
  margin-bottom: 20px;
}
</style>
