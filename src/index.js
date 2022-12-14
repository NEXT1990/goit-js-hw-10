import './css/styles.css';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputField = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

console.dir(countryInfo);

inputField.addEventListener(
  'keydown',
  debounce(event => {
    GetCountries({
      name: inputField.value,
    });
  }, DEBOUNCE_DELAY)
);

function GetCountries({ name }) {
  const urlApi = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;
  fetch(urlApi)
    .then(res => {
      if (res.status !== 200) {
        console.log('Все что угодно, но не 200!');
      }
      return res.json();
    })
    .then(data => {
      render(data);
      console.log(data);
    });
}

function render(countryData) {
  countryInfo.innerHTML = '';
  countryData.forEach(({ name, capital, population, flag, languages }) => {
    const DataEl = `
      < img src = "${flag}" alt = "${name}" />
      <h1>${name}</h1>
      <p>${capital}</p>
      <p>${population}</p>
      <p>${languages}</p>
      `;

    countryInfo.insertAdjacentHTML('beforeend', DataEl);
  });
}
