import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

import fetchCountries from '../fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputField = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

console.dir(countryInfo);

inputField.addEventListener(
  'input',
  debounce(event => {
    const inputValue = inputField.value;
    if (inputValue === '') {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      return;
    }
    fetchCountries(inputValue)
      .then(render)
      .catch(error => {
        if (error && inputValue !== '') {
          Notify.failure('Oops, there is no country with that name');
        }
      });
  }, DEBOUNCE_DELAY)
);

function render(countryData) {
  const DataEl = countryData
    .map(
      ({ name, flags }) =>
        `<li>
        <img src="${flags.svg}" alt="${name.official}" width="40" height="40">
      <h2>${name.official}</h2>
      </li>
      `

      // <svg width="40" height="40">
      //   <use href="${flags.svg}"></use>
    )
    .join('');

  console.log(countryData.length);

  countryList.insertAdjacentHTML('beforeend', DataEl);
  countryInfo.innerHTML = '';

  if (countryData.length === 1) {
    countryList.innerHTML = '';
    const DataOneEl = countryData.map(
      ({ name, flags, capital, population, languages }) =>
        `<li>
        <img src="${flags.svg}" alt="${name.official}" width="80" height="80">
      <h1>${name.official}</h1>
      </li>
    <p class="text"><b>Capital:</b> ${capital}</p>
    <p class="text"><b>Population:</b> ${population}</p>
    <p class="text"><b>Languages:</b> ${Object.values(languages)}</p>
      `

      // <svg width="80" height="80">
      //   <use href="${flags.svg}"></use>
    );
    countryInfo.insertAdjacentHTML('beforeend', DataOneEl.join(''));
  } else if (countryData.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    countryList.innerHTML = '';
  }
}
