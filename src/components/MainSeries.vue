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
  <h2>Tv Series</h2>
  <MainCard
    v-for="serie in store.series"
    :title="serie.name"
    :titleOriginal="serie.original_name"
    :lang="serie.original_language"
    :vote="serie.vote_average"
    :overview="serie.overview"
    :imgPath="serie.poster_path"
  />
  <p v-show="store.series.length < 1">No results found in series</p>
</template>

<style scoped>
h2 {
  font-size: 50px;
}
</style>
