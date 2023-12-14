<script>
export default {
  data() {
    return {
      pathPartOne: "https://image.tmdb.org/t/p/w342",
    };
  },
  props: {
    objContent: Object,
    isObjWhat: String,
  },
  methods: {
    seriesOrMovie1() {
      if (this.isObjWhat === "film") {
        return this.objContent.title;
      }
      return this.objContent.name;
    },
    seriesOrMovie2() {
      if (this.isObjWhat === "film") {
        return this.objContent.original_title;
      }
      return this.objContent.original_name;
    },
    langFlags() {
      if (this.objContent.original_language === "en") {
        return "us";
      }
      if (this.objContent.original_language === "ja") {
        return "jp";
      }
      if (this.objContent.original_language === "ko") {
        return "kr";
      }
      return this.objContent.original_language;
    },
    countStars() {
      if (this.objContent.vote_average < 2) {
        return 1;
      } else if (this.objContent.vote_average < 4) {
        return 2;
      } else if (this.objContent.vote_average < 6) {
        return 3;
      } else if (this.objContent.vote_average < 8) {
        return 4;
      }
      return 5;
    },
  },
};
</script>

<template>
  <ul>
    <li>
      <img
        :src="pathPartOne + objContent.poster_path"
        :alt="`${seriesOrMovie1()}`"
      />
    </li>
    <li>{{ seriesOrMovie1() }}</li>
    <li>{{ seriesOrMovie2() }}</li>
    <li>
      {{ objContent.original_language }}
    </li>
    <li>
      <span :class="`fi fi-${langFlags()}`"></span>
    </li>
    <li>{{ objContent.vote_average }}</li>
    <li>
      <i class="fa-solid fa-star" v-for="n in countStars()"></i>
      <i class="fa-regular fa-star" v-for="n in 5 - countStars()"></i>
    </li>
    <li>{{ objContent.overview }}</li>
  </ul>
</template>

<style scoped>
ul {
  margin-bottom: 20px;
}

i {
  color: gold;
  font-size: 20px;
}
</style>
