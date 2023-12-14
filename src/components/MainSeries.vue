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
  <MainCard v-for="serie in store.series" :objContent="serie" isObjWhat="tv" />
  <p v-show="store.series.length < 1">No results found in series</p>
</template>
