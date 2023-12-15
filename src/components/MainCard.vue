<script>
export default {
  data() {
    return {
      pathPartOne: "https://image.tmdb.org/t/p/w342",
    };
  },
  props: {
    title: String,
    titleOriginal: String,
    lang: String,
    vote: Number,
    overview: String,
    imgPath: String,
  },
  computed: {
    countStars() {
      return Math.ceil(this.vote / 2);
    },
    langFlags() {
      if (this.lang === "en") {
        return "us";
      }
      if (this.lang === "ja") {
        return "jp";
      }
      if (this.lang === "ko") {
        return "kr";
      }
      return this.lang;
    },
  },
};
</script>

<template>
  <ul>
    <li>
      <img :src="pathPartOne + imgPath" :alt="title" />
    </li>
    <li>{{ title }}</li>
    <li>{{ titleOriginal }}</li>
    <li>{{ lang }} <span :class="`fi fi-${langFlags}`"></span></li>
    <li class="stars">
      <font-awesome-icon icon="fa-solid fa-star" v-for="n in countStars" />
      <font-awesome-icon
        icon="fa-regular fa-star"
        v-for="n in 5 - countStars"
      ></font-awesome-icon>
    </li>
    <li>{{ overview }}</li>
  </ul>
</template>

<style scoped>
ul {
  margin-bottom: 20px;
}
.stars {
  color: gold;
  font-size: 20px;
}
</style>
