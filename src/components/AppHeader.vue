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
    axios.get(this.store.urlStartMovies).then((response) => {
      this.store.movies = response.data.results;
    });
    axios.get(this.store.urlStartSeries).then((response) => {
      this.store.series = response.data.results;
    });
  },
  methods: {
    goSearch() {
      if (this.store.searchTxt.trim().length > 0) {
        axios
          .get(this.store.urlMovies, {
            params: {
              query: this.store.searchTxt,
            },
          })
          .then((response) => {
            this.store.movies = response.data.results;
          });
        axios
          .get(this.store.urlSeries, {
            params: {
              query: this.store.searchTxt,
            },
          })
          .then((response) => {
            this.store.series = response.data.results;
          });
      }
      this.store.searchTxt = "";
    },
  },
};
</script>

<template>
  <header>
    <HeaderSearcher @search="goSearch" />
  </header>
</template>

<style scoped>
header {
  padding: 30px;
}
</style>
