import { createApp } from "vue";
// file di partenza styles progetto
import "./assets/scss/general.scss";
// file start Vue
import App from "./App.vue";
// bandierine nazione
import "/node_modules/flag-icons/css/flag-icons.min.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

/* add icons to the library */
library.add(faStar, faStarEmpty);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
