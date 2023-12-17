import { reactive } from "vue";

export const store = reactive({
  apiKey: "af9c400b5f27b0ea05b889ad68b01928",
  searchTxt: "",
  movies: [],
  series: [],
  genres: [],
  urlBasic: "https://api.themoviedb.org/3",
  urlStartMovies:
    "https://api.themoviedb.org/3/movie/popular?api_key=af9c400b5f27b0ea05b889ad68b01928",
  urlStartSeries:
    "https://api.themoviedb.org/3/tv/popular?api_key=af9c400b5f27b0ea05b889ad68b01928",
  urlMovies:
    "https://api.themoviedb.org/3/search/movie?api_key=af9c400b5f27b0ea05b889ad68b01928&",
  urlSeries:
    "https://api.themoviedb.org/3/search/tv?api_key=af9c400b5f27b0ea05b889ad68b01928&",
  urlGenres:
    "https://api.themoviedb.org/3/genre/movie/list?api_key=af9c400b5f27b0ea05b889ad68b01928",
});
