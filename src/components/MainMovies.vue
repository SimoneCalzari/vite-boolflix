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
  computed: {
    // computed per mostrare un messaggio quando il filtro dei generi non da risultati
    filterNoResults() {
      // caso di default del select da gestire separatamente
      if (this.store.currentGenre === "") {
        return false;
      }
      // gestione casi diversi dal default
      let checkFilter = true;
      this.store.movies.forEach((movie) => {
        if (movie.genre_ids.includes(this.store.currentGenre)) {
          checkFilter = false;
        }
      });
      return checkFilter;
    },
  },
};
</script>

<template>
  <div class="movies flex">
    <!-- componente card su cui cicliamo e a cui passiamo props per popolarla -->
    <MainCard
      v-for="(movie, index) in store.movies"
      :title="movie.title"
      :titleOriginal="movie.original_title"
      :lang="movie.original_language"
      :vote="movie.vote_average"
      :overview="movie.overview"
      :imgPath="movie.poster_path"
      :genresList="movie.genre_ids"
      :identifier="movie.id"
      isWhat="movie"
    />
  </div>
  <!-- paragrafo nel caso non si abbiano risultati dalla ricerca o dall'inserimento di un filtro per genere -->
  <p v-show="store.movies.length < 1 || filterNoResults">
    No results found in movies
  </p>
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
