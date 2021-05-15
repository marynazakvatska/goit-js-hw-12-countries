import inputTemplate from "./template.hbs";
import countriesList from "./countries.hbs";
import { debounce } from "lodash";
import ApiServise from "./api-service.js";

/* import PNotify from "./../node_modules/pnotify/dist/es/PNotify.js"; */

const refs = {
  input: document.querySelector("input"),
  countriesList: document.querySelector(".countries-list"),
};

const apiServise = new ApiServise();

refs.input.addEventListener("input", debounce(onSearch, 500));

function onSearch(e) {
  clearCardList();

  apiServise.query = e.target.value;

  apiServise.fetchCountries().then((data) => {
    if (data.length > 10) {
      PNotify.error({
        text: "Too many matches found. Please enter a more spesific query!",
      });
    } else if (data.length > 1) {
      countriesMarkup(data);
    } else {
      countryMarkup(data);
    }
  });
}
function countriesMarkup(items) {
  refs.countriesList.insertAdjacentHTML("beforeend", countriesList(items));
}

function countryMarkup(items) {
  refs.countriesList.insertAdjacentHTML("beforeend", inputTemplate(items));
}

function clearCardList() {
  refs.countriesList.innerHTML = "";
}

/* 

function renderCountryCard(name) {
  const markup = inputTemplate(name);
  refs.container.innerHTML = markup;
  console.log(markup);
}

function fetchCountries(name) {
  const url = `https://restcountries.eu/rest/v2/name/${name}`;
  return fetch(url).then((response) => response.json());
}

function onFetchError(error) {
  alert("something is wrong!!!");
}
 */

/* 
fetch("https://restcountries.eu/rest/v2/name/france")
  .then((response) => {
    return response.json();
  })
  .then((name) => {
    console.log(name);
    const markup = inputTemplate(name);
    refs.container.innerHTML = markup;
    console.log(markup);
  })
  .catch((error) => {
    console.log(error);
  });
 */

/* 
const refs = {
  container: document.querySelector(".js-container"),
  searchForm: document.querySelector(".js-rearch-form"),
};
refs.searchForm.addEventListener("input", onSearch);
let searchQuery = "";
function onSearch(e) {
  const form = e.currentTarget;
  console.log(form.elements);
  searchQuery = form.elements.query.value; //значение инпута во время сабмита формы  fetchCountries(searchQuery).then(renderCountryCard).catch(onFetchError);

  fetchCountries(searchQuery).then(renderCountryCard).catch(onFetchError);

}
function renderCountryCard(name) {
  const markup = inputTemplate(name);
  refs.container.innerHTML = markup;

function fetchCountries(name) {
  const url = `https://restcountries.eu/rest/v2/name/${name}`;
  return fetch(url).then((response) => response.json());
}
function onFetchError(error) {
  alert("something is wrong!!!");
}
 */
