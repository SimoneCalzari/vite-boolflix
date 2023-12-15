<script>
import AppMain from "./components/AppMain.vue";
import AppHeader from "./components/AppHeader.vue";
export default {
  components: {
    AppHeader,
    AppMain,
  },
};
</script>

<template>
  <div class="flex pseudo-body">
    <AppHeader />
    <AppMain />
  </div>
</template>

<style scoped>
.pseudo-body {
  height: 100vh;
  flex-direction: column;
}
</style>
