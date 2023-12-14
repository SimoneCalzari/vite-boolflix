<script>
import MainCard from "./MainCard.vue";
import { store } from "../store";
export default {
  components: {
    MainCard,
  },
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <h2>Movies</h2>
  <MainCard
    v-for="movie in store.movies"
    :objContent="movie"
    isObjWhat="film"
  />
  <p v-show="store.movies.length < 1">No results found in movies</p>
</template>

<style scoped>
h2 {
  font-size: 50px;
}
</style>
