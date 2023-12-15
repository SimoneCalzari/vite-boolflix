<script>
import HeaderSearcher from "./HeaderSearcher.vue";
import axios from "axios";
import { store } from "../store.js";
export default {
  components: {
    HeaderSearcher,
  },
  data() {
    return {
      store,
    };
  },
  created() {
    // variabili per migliorare leggibilità codice
    const urlMovies = this.store.urlStartMovies;
    const urlSeries = this.store.urlStartSeries;
    this.callApi(urlMovies, "movies");
    this.callApi(urlSeries, "series");
  },
  methods: {
    callApi(url, key) {
      axios.get(url).then((response) => {
        this.store[key] = response.data.results;
      });
    },
    goSearch() {
      //variabili per migliorare leggibilità codice
      const searchInput = this.store.searchTxt;
      const urlMovies = this.store.urlMovies + "&query=" + searchInput;
      const urlSeries = this.store.urlMovies + "&query=" + searchInput;
      if (searchInput.trim().length > 0) {
        this.callApi(urlMovies, "movies");
        this.callApi(urlSeries, "series");
      }
      this.store.searchTxt = "";
    },
  },
};
</script>

<template>
  <header>
    <div class="container flex box-header">
      <h1 class="upper">Boolflix</h1>
      <HeaderSearcher @search="goSearch" />
    </div>
  </header>
</template>

<style scoped lang="scss">
@use "../assets/scss/partials/variables" as *;
header {
  background-color: $header-bkg;
  .box-header {
    justify-content: space-between;
    padding: 15px 0;
    h1 {
      color: $page-title;
      font-size: 40px;
      letter-spacing: 2px;
    }
  }
}
</style>
