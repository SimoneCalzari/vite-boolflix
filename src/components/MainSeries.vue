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
      this.store.series.forEach((serie) => {
        if (serie.genre_ids.includes(this.store.currentGenre)) {
          checkFilter = false;
        }
      });
      return checkFilter;
    },
  },
};
</script>

<template>
  <div class="series flex">
    <!-- componente card su cui cicliamo e a cui passiamo props per popolarla -->
    <MainCard
      v-for="(serie, index) in store.series"
      :title="serie.name"
      :titleOriginal="serie.original_name"
      :lang="serie.original_language"
      :vote="serie.vote_average"
      :overview="serie.overview"
      :imgPath="serie.poster_path"
      :genresList="serie.genre_ids"
      :identifier="serie.id"
      isWhat="serie"
    />
  </div>
  <!-- paragrafo nel caso non si abbiano risultati dalla ricerca o dall'inserimento di un filtro per genere -->
  <p v-show="store.series.length < 1 || filterNoResults">
    No results found in series
  </p>
</template>

<style scoped lang="scss">
@use "../assets/scss/partials/mixins" as *;
@use "../assets/scss/partials/variables" as *;
.series {
  flex-wrap: wrap;
  @include gap(10px);
}
p {
  color: white;
  font-size: 18px;
}
</style>
