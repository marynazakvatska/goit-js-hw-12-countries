import { notice } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

export default class ApiServise {
  constructor() {
    this.searchQuery = "";
  }

  fetchCountries() {
    const BASE_URL = `https://restcountries.eu/rest/v2/name/${this.searchQuery}`;
    return fetch(BASE_URL).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        notice({
          text: "No any country is chosen",
        });
      }
    });
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

function renderCountryCard(name) {
  const markup = inputTemplate(name);
  refs.container.innerHTML = markup;
}

/* function fetchCountries() {
  const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;
  return fetch(url).then((response) => response.json());
}
 */
/* function onFetchError(error) {
  alert("something is wrong!!!");
}
 */
