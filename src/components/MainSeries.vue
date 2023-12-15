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
  <div class="series flex">
    <MainCard
      v-for="serie in store.series"
      :title="serie.name"
      :titleOriginal="serie.original_name"
      :lang="serie.original_language"
      :vote="serie.vote_average"
      :overview="serie.overview"
      :imgPath="serie.poster_path"
    />
  </div>
  <p v-show="store.series.length < 1">No results found in series</p>
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
