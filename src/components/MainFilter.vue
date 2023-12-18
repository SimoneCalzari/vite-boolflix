<script>
import { store } from "../store.js";
export default {
  data() {
    return {
      store,
      currentGenre: "",
    };
  },
};
</script>

<template>
  <div class="filter-bar">
    <label for="filter-genres">Select genre:</label>
    <select name="genre" id="filter-genres" v-model="this.store.currentGenre">
      <option value="">Show all genres</option>
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
