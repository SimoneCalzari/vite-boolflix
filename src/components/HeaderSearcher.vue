<script>
import { store } from "../store.js";
export default {
  emits: ["search"],
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <input type="text" v-model="store.searchTxt" />
  <button @click="$emit('search')">Cerca</button>
</template>
