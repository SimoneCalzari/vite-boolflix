<script>
import MainMovies from "./MainMovies.vue";
import MainSeries from "./MainSeries.vue";
export default {
  components: {
    MainMovies,
    MainSeries,
  },
};
</script>

<template>
  <main>
    <MainMovies />
    <MainSeries />
  </main>
</template>

<style scoped>
main {
  padding: 30px;
}
</style>
