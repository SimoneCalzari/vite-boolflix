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
};
</script>

<template>
  <header>
    <HeaderSearcher />
  </header>
</template>
