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
  <div class="movies flex">
    <MainCard
      v-for="movie in store.movies"
      :title="movie.title"
      :titleOriginal="movie.original_title"
      :lang="movie.original_language"
      :vote="movie.vote_average"
      :overview="movie.overview"
      :imgPath="movie.poster_path"
      :genresList="movie.genre_ids"
    />
  </div>
  <p v-show="store.movies.length < 1">No results found in movies</p>
</template>

<style scoped lang="scss">
@use "../assets/scss/partials/mixins" as *;
@use "../assets/scss/partials/variables" as *;
.movies {
  flex-wrap: wrap;
  @include gap(10px);
}

p {
  color: white;
  font-size: 18px;
}
</style>
