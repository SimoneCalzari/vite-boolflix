<script>
import { store } from "../store.js";
export default {
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <div class="filter-bar">
    <label for="filter-genres">Select genre:</label>
    <!-- select con valore in data binding con una proprietà dello store globale -->
    <select name="genre" id="filter-genres" v-model="this.store.currentGenre">
      <!-- option di default -->
      <option value="">Show all genres</option>
      <!-- cicliamo le option in base alla lista di generi presa dall'api, assegniamo al value l id e mostriamo invece il nome nel dom -->
      <option v-for="genre in this.store.genres" :value="genre.id">
        {{ genre.name }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/scss/partials/variables" as *;
.filter-bar {
  margin-top: 25px;
  label {
    color: white;
    font-weight: bold;
    font-size: 22px;
    letter-spacing: 2px;
    margin-right: 15px;
  }
  select {
    outline: none;
    font-size: 16px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
  }
}
</style>
