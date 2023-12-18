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
    // variabili per migliorare leggibilità codice da inserire nelle funzioni callApi
    const urlMovies = this.store.urlStartMovies;
    const urlSeries = this.store.urlStartSeries;
    // chiamata per la sezione movies al caricamento della pagina
    this.callApi(urlMovies, "movies", "results");
    // chiamata per la sezione series al caricamento della pagina
    this.callApi(urlSeries, "series", "results");
    // chiamata per salvare i generi di film e serie disponibili
    this.callApi(this.store.urlGenres, "genres", "genres");
  },
  methods: {
    // funzione per le chiamate api
    callApi(url, keyStore, keyResults) {
      axios.get(url).then((response) => {
        this.store[keyStore] = response.data[keyResults];
      });
    },
    // funzione per la ricerca richiamata sia tramite enter che click sul bottone
    goSearch() {
      //variabili per migliorare leggibilità codice
      // input della barra di ricerca
      const searchInput = this.store.searchTxt;
      // url per ricerca tra i film
      const urlMovies = this.store.urlMovies + "&query=" + searchInput;
      // url per la ricerca tra le serie
      const urlSeries = this.store.urlSeries + "&query=" + searchInput;
      // condizione per evitare che l utente invi un input di testo vuoto
      if (searchInput.trim().length > 0) {
        // chiamata ricerca movie
        this.callApi(urlMovies, "movies", "results");
        // chiamata ricerca serie
        this.callApi(urlSeries, "series", "results");
        // cambio della proprietà trick dello store per innescare il richiamo della computed getCast nel componente MainCard.vue (c'è sicuramente un modo migliore di risolvere il problema della chiamata api per ottenere gli attori dei vari film!!!!!!!)
        this.store.trick = !this.store.trick;
      }
      // ristabilisco valori di default per l input di testo e il select
      this.store.searchTxt = "";
      this.store.currentGenre = "";
    },
  },
};
</script>

<template>
  <header>
    <div class="container flex box-header">
      <h1 class="upper">Boolflix</h1>
      <!-- ricerca sia con click che con enter alla ricezione degli emit del componente figlio HeaderSearcher.vue -->
      <HeaderSearcher @search="goSearch" @search2="goSearch" />
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
