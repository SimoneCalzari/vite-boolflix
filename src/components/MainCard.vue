<script>
import { store } from "../store.js";
import axios from "axios";
export default {
  data() {
    return {
      pathPartOne: "https://image.tmdb.org/t/p/w342",
      contentVisible: false,
      checkloop: true,
      trick: "",
      // array per ottenere i nomi dei generi
      cardGenres: [],
      cardGenresId: [],
      castActors: [],
      store,
    };
  },
  props: {
    title: String,
    titleOriginal: String,
    lang: String,
    vote: Number,
    overview: String,
    imgPath: String,
    // array con id generi
    genresList: Array,
    identifier: Number,
    isWhat: String,
  },
  methods: {
    showContent() {
      this.contentVisible = !this.contentVisible;
    },
  },
  computed: {
    getGenres() {
      this.cardGenres = [];
      this.cardGenresId = [];
      this.store.genres.forEach((genreObj) => {
        if (this.genresList.includes(genreObj.id)) {
          this.cardGenres.push(genreObj.name);
          this.cardGenresId.push(genreObj.id);
        }
      });
      return this.cardGenres.join(", ");
    },
    getCast() {
      this.trick = this.store.trick;
      if (this.checkloop) {
        // decido se avere come query movie o tv a seconda di cosa rappresenterà la mia card
        let queryMovieSerie = "movie";
        if (this.isWhat !== "movie") {
          queryMovieSerie = "tv";
        }
        // compo l url per la chiamta api
        const urlCast =
          this.store.urlBasic +
          `/${queryMovieSerie}/` +
          `${this.identifier}/` +
          "credits?api_key=" +
          this.store.apiKey;
        axios.get(urlCast).then((response) => {
          // salvo la risposta dell api in una proprietà del mio componente
          this.castActors = response.data.cast;
          this.checkloop = false;
        });
      } else {
        this.checkloop = true;
        // inizializzo un array vuoto dove salverò solo i nomi degli attori
        const actorNames = [];
        this.castActors.forEach((actor) => {
          actorNames.push(actor.name);
        });

        // se ho più di 5 attori vorrò solo primi 5
        if (actorNames.length > 5) {
          actorNames.splice(5);
        }
        // restituisco i nomi degli attori come stringa separati da una virgola e spazio
        return actorNames.join(", ");
      }
    },
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
  <article
    @mouseenter="showContent"
    @mouseleave="showContent"
    v-show="
      cardGenresId.includes(store.currentGenre) || store.currentGenre === ''
    "
  >
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
      <div v-show="cardGenres.length > 0">
        <span>Genres:</span> {{ getGenres }}
      </div>
      <div v-show="castActors.length > 0"><span>Cast:</span> {{ getCast }}</div>
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
