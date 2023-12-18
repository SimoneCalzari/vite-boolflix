<script>
import { store } from "../store.js";
export default {
  emits: ["search", "search2"],
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <div class="search-container flex">
    <label for="search" class="hidden">Barra di ricerca</label>
    <!-- barra di ricerca, il cui value è legato ad una variabile dello store, che fa un emit per triggerare la chiamata della ricerca dei film o serie -->
    <input
      type="text"
      v-model="store.searchTxt"
      id="search"
      placeholder="Search Movies, TV Shows ..."
      @keyup.enter="$emit('search2')"
    />
    <!-- button che fa un emit per triggerare la chiamata della ricerca dei film o serie -->
    <button @click="$emit('search')" id="search-btn">Search</button>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/scss/partials/variables" as *;
.search-container {
  // background-color: yellow;
  align-items: center;
  gap: 20px;
  #search {
    border: none;
    padding: 7px 15px;
    border-radius: 5px;
    outline: none;
    font-size: 15px;
  }
  #search-btn {
    border: none;
    font-size: 14px;
    padding: 7px 15px;
    border-radius: 10px;
    cursor: pointer;
    background-color: $page-title;
    color: white;
    font-weight: bold;
    &:hover {
      background-color: white;
      color: $page-title;
    }
    &:active {
      background-color: $page-title;
      color: white;
    }
  }
}
@media screen and (max-width: 768px) {
  .search-container #search-btn {
    display: none;
  }
  label {
    display: none;
  }
}
</style>
