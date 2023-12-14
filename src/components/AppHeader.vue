<script>
import HeaderSearcher from "./HeaderSearcher.vue";
import axios from "axios";
import { store } from "../store.js";
export default {
  components: {
    HeaderSearcher,
  },
  props: {},
  data() {
    return {
      store,
    };
  },
  created() {
    axios.get(this.store.urlStart).then((response) => {
      this.store.movies = response.data.results;
      console.log(this.store.movies);
    });
  },
};
</script>

<template>
  <header>
    <HeaderSearcher />
  </header>
</template>

<style scoped>
header {
  padding: 30px;
}
</style>
