import inputTemplate from "./template.hbs";
import countriesList from "./countries.hbs";
import { debounce } from "lodash";
import ApiServise from "./api-service.js";
import { error } from "@pnotify/core";
import { notice } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

const refs = {
  input: document.querySelector("input"),
  countriesList: document.querySelector(".countries-list"),
};

const apiServise = new ApiServise();

refs.input.addEventListener("input", debounce(onSearch, 500));

function onSearch(e) {
  clearCardList();

  apiServise.query = e.target.value;

  apiServise
    .fetchCountries()
    .then((data) => {
      if (data.length > 10) {
        error({
          text: "Too many matches found. Please enter a more spesific query!",
        });
      } else if (data.length > 1) {
        countriesMarkup(data);
      } else {
        countryMarkup(data);
      }
    })
    .catch((error) =>
      notice({
        text: "Tape the name of the country",
      })
    );
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
