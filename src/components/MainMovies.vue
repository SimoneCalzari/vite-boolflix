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
  <MainCard v-for="movie in store.movies" :objContent="movie" />
  <p v-show="store.movies.length < 1">No results found</p>
</template>
