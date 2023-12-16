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
      <img :src="pathPartOne + imgPath" alt="Image Not Available" />
    </div>
    <div class="content-box" :class="{ none: !contentVisible }">
      <h4><span>Title: </span>{{ title }}</h4>
      <h4 v-show="title !== titleOriginal">
        <span>Original Title: </span>{{ titleOriginal }}
      </h4>
      <div>
        <span>Original Language: </span>{{ lang }}
        <span :class="`fi fi-${langFlags}`"></span>
      </div>
      <div v-show="vote > 0">
        <span>Vote: </span>
        <font-awesome-icon
          icon="fa-solidd fa-star"
          v-for="n in countStars"
          class="star"
        />
        <font-awesome-icon
          icon="fa-regular fa-star"
          v-for="n in 5 - countStars"
          class="star"
        />
      </div>
      <p v-show="overview.length > 0"><span>Overview: </span>{{ overview }}</p>
    </div>
  </article>
</template>

<style scoped lang="scss">
@use "../assets/scss/partials/mixins" as *;
@use "../assets/scss/partials/variables" as *;

article {
  @include grid(5, 10px);
  border: 1px solid white;
  letter-spacing: 1px;
  margin-bottom: 30px;
  height: 350px;
  .img-box {
    height: 100%;
    img {
      width: 100%;
      display: block;
      height: 100%;
      color: white;
      font-size: 20px;
    }
  }
  h4 {
    font-weight: lighter;
    font-size: 14px;
  }
  .content-box {
    color: white;
    padding: 15px;
    font-size: 13px;
    height: 100%;
    overflow: auto;
    & > * {
      margin-bottom: 7px;
    }
    span {
      font-weight: bold;
    }
    .star {
      color: gold;
    }
  }
}

// responsive
@media screen and (max-width: 1200px) {
  article {
    @include grid(4, 10px);
  }
}

@media screen and (max-width: 992px) {
  article {
    @include grid(3, 10px);
  }
}

@media screen and (max-width: 768px) {
  article {
    @include grid(2, 10px);
  }
}

@media screen and (max-width: 576px) {
  article {
    @include grid(1, 10px);
  }
}
</style>
