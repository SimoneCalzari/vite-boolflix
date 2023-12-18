<script>
import MainMovies from "./MainMovies.vue";
import MainSeries from "./MainSeries.vue";
import MainFilter from "./MainFilter.vue";
import { store } from "../store.js";
export default {
  data() {
    return {
      store,
    };
  },
  components: {
    MainMovies,
    MainSeries,
    MainFilter,
  },
};
</script>

<template>
  <main>
    <div class="container">
      <!-- componente per filtrare i risultati della ricerca in base al genere scelto -->
      <MainFilter />
      <section>
        <h2>Movies</h2>
        <!-- componente contenitore per le card dei movie -->
        <MainMovies />
      </section>
      <section>
        <h2>TV Shows</h2>
        <!-- componente contenitore per le card delle serie -->
        <MainSeries />
      </section>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use "../assets/scss/partials/variables" as *;
main {
  background-color: $main-bkg;
  flex-grow: 1;
  overflow: auto;
  section {
    padding: 20px 0;
    h2 {
      color: white;
      font-size: 30px;
      margin-bottom: 20px;
      letter-spacing: 3px;
    }
  }
}
</style>
