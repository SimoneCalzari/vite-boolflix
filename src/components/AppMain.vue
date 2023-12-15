<script>
import MainMovies from "./MainMovies.vue";
import MainSeries from "./MainSeries.vue";
export default {
  components: {
    MainMovies,
    MainSeries,
  },
};
</script>

<template>
  <main>
    <div class="container">
      <section>
        <h2>Movies</h2>
        <MainMovies />
      </section>
      <section>
        <h2>TV Shows</h2>
        <MainSeries />
      </section>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use "../assets/scss/partials/variables" as *;
main {
  background-color: $main-bkg;
  flex-grow: 1;
  overflow: auto;
  section {
    padding: 20px 0;
    h2 {
      color: white;
      font-size: 30px;
      margin-bottom: 20px;
      letter-spacing: 3px;
    }
  }
}
</style>
