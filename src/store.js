import { reactive } from "vue";

export const store = reactive({
  searchTxt: "",
  movies: [],
  series: [],
  urlStart:
    "https://api.themoviedb.org/3/movie/popular?api_key=af9c400b5f27b0ea05b889ad68b01928",
  urlMovies:
    "https://api.themoviedb.org/3/search/movie?api_key=af9c400b5f27b0ea05b889ad68b01928&",
  urlSeries:
    "https://api.themoviedb.org/3/search/tv?api_key=af9c400b5f27b0ea05b889ad68b01928&",
});
