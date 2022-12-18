export default function fetchCountries(name) {
  const urlApi = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
  return fetch(urlApi).then(res => {
    if (res.status !== 200) {
      console.log('Все что угодно, но не 200!');
    }
    return res.json();
  });
}
