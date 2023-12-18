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
      // array per i nomi dei generi della carta
      cardGenres: [],
      // array per gli id dei generi della card
      cardGenresId: [],
      // array per gli attori del cast (sono oggetti gli attori)
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
    // array con i generi della mia card sotto forma di id (l'api per la chiamata search non restituisce i nomi ma solo gli id)
    genresList: Array,
    // id del film o serie della card
    identifier: Number,
    // props generica per distinguere se nella card abbiamo un film o una serie
    isWhat: String,
  },
  methods: {
    // metodo per mostrare le info sui film serie all hover in e out dalla card
    showContent() {
      this.contentVisible = !this.contentVisible;
    },
  },
  computed: {
    // computed per salvarsi i generi della scheda corrente come id e come nomi, poi restituisce una stringa con i nomi dei vari generi
    // deve essere una computed altrimenti inizia a richiamare se stessa in quanto cambia le proprie dipendenze e inizia a loopare (credo)
    getGenres() {
      this.cardGenres = [];
      this.cardGenresId = [];
      // ciclo sull'array dei generi globali forniti dall'api, se questi sono inclusi nell'array dei generi del mio film/serie pusho nomi e id in due array nei data di questo componente, in modo da averli disponibili
      this.store.genres.forEach((genreObj) => {
        if (this.genresList.includes(genreObj.id)) {
          this.cardGenres.push(genreObj.name);
          this.cardGenresId.push(genreObj.id);
        }
      });
      //facciamo un return dei generi della mia card sotto forma di stringa per inserirli nel dom
      return this.cardGenres.join(", ");
    },
    // computed per la chiamata api del cast del film o serie e inserimento dei primi 5 nel dom
    //  NON è BEST PRACTICE USARE UNA COMPUTED PER CHIAMATE ASINCRONE IN CUI SI MODIFICANO LE COMPONENTI REATTIVE STESSE E RISCHIO DI LOOPARE MOLTO ALTO
    // tentativo di implementazione logica per evitare il loop
    getCast() {
      // proprietà del componente a cui assegno un valore di una proprietà dello store, questo valore viene mutato ogni volta che faccio una chiamata api per la ricerca, in questo modo richiamo la computed dopo aver fatto una ricerca (sembra funzionare ma non credo sia una best practice)
      this.trick = this.store.trick;
      // parte del ciclo in cui faccio una chiamata all api e pongo una condizione per entrarci in modo da evitare loop di chiamate
      if (this.checkloop) {
        // decido se avere come query movie o tv a seconda di cosa rappresenterà la mia card
        let queryMovieSerie = "movie";
        if (this.isWhat !== "movie") {
          queryMovieSerie = "tv";
        }
        // compongo l url per la chiamta api
        const urlCast =
          this.store.urlBasic +
          `/${queryMovieSerie}/` +
          `${this.identifier}/` +
          "credits?api_key=" +
          this.store.apiKey;
        // chiamata api
        axios.get(urlCast).then((response) => {
          // salvo la risposta dell api in una proprietà del mio componente
          this.castActors = response.data.cast;
          // una volta ottenuta risposta pongo la mia variabile di condizione false in modo da non rifare la chiamata quando questa computed viene richiamata (non sono sicuro faccia solo una chiamata, ma almeno non loopa)
          this.checkloop = false;
        });
      }
      // caso in cui entro quando ho ricevuto la risposta dall api ed elaboro l'array del cast per avere solo i primi 5 attori
      else {
        // per la prossima chiamata di questa computed metto la variabile di condizione a true in modo che si possa entrare nella parte di IF dove faccio la chiamata
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
    // computed per convertire il voto in un numero di stelle da 1 a 5
    countStars() {
      return Math.ceil(this.vote / 2);
    },
    // computed per restituire la sigla del paese ad un componente bandierina preso da una libreria esterna, sono stati coperti i casi principali in cui la sigla della lingua dell'api e quella della bandiera della libreria non coincidevano (i principali, non tutti)
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
  <!-- article contenitore del poster e delle info -->
  <!-- mouse enter e mouse leave mostriamo e nascondiamo le info -->
  <!-- v show con condizioni che il valore corrente della select filtro sia incluso nell'array generi della nostra card oppure che il valore del select sia quello di default (tutti i generi sostanzialmente) -->
  <article
    @mouseenter="showContent"
    @mouseleave="showContent"
    v-show="
      cardGenresId.includes(store.currentGenre) || store.currentGenre === ''
    "
  >
    <!-- contenitore immagine, il cui display viene variato dalla classe none a seconda del valore della proprietà contentVisibile -->
    <div class="img-box" :class="{ none: contentVisible }">
      <!-- immagine con src bindato alle proprietà i cui valori concatenati formano l url desiderato -->
      <img :src="pathPartOne + imgPath" alt="Image Not Available" />
    </div>
    <!-- contenitore info, stesse considerazioni sul display, classe none e contentVisible fatte per il contenitore dell'immagine -->
    <div class="content-box" :class="{ none: !contentVisible }">
      <!-- titolo film -->
      <h4><span>Title: </span>{{ title }}</h4>
      <!-- titolo originale del film, lo mostriamo solo se diverso da quello sopra -->
      <h4 v-show="title !== titleOriginal">
        <span>Original Title: </span>{{ titleOriginal }}
      </h4>
      <!-- lingua originale e bandiera del rispettivo paese -->
      <div>
        <span>Original Language: </span>{{ lang }}
        <span :class="`fi fi-${langFlags}`"></span>
      </div>
      <!-- voto espresso in stelle con eccezione per il caso in cui il voto sarebbe zero e non mostriamo nessun voto  -->
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
      <!-- generi della card che mostriamo solo se presenti tramite la condizione nel v show sotto -->
      <div v-show="cardGenres.length > 0">
        <span>Genres:</span> {{ getGenres }}
      </div>
      <!-- massimo 5 attori del cast mostrati, anche qui se il cast non c'è non verrà mostrato questo contenutore -->
      <div v-show="castActors.length > 0"><span>Cast:</span> {{ getCast }}</div>
      <!-- trama del film -->
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

// responsive sfruttando mixin della griglia
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
