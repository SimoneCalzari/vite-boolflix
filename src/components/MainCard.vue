<script>
export default {
  data() {
    return {
      pathPartOne: "https://image.tmdb.org/t/p/w342",
      contentVisible: false,
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
  methods: {
    showContent() {
      this.contentVisible = !this.contentVisible;
    },
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
  <article @mouseenter="showContent" @mouseleave="showContent">
    <div class="img-box" :class="{ none: contentVisible }">
      <img :src="pathPartOne + imgPath" :alt="title" />
    </div>
    <div class="content-box" :class="{ none: !contentVisible }">
      <div>{{ title }}</div>
      <div>{{ titleOriginal }}</div>
      <div>{{ lang }} <span :class="`fi fi-${langFlags}`"></span></div>
      <div class="stars">
        <font-awesome-icon icon="fa-solidd fa-star" v-for="n in countStars" />
        <font-awesome-icon
          icon="fa-regular fa-star"
          v-for="n in 5 - countStars"
        ></font-awesome-icon>
      </div>
      <div>{{ overview }}</div>
    </div>
  </article>
</template>

<style scoped lang="scss">
@use "../assets/scss/partials/mixins" as *;
@use "../assets/scss/partials/variables" as *;
article {
  @include grid($cards-per-row, $main-grid-gap);
  .img-box {
    img {
      width: 100%;
      display: block;
    }
  }
  .content-box {
    color: white;
  }
}
</style>
