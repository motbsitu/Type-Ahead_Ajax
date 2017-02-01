window.addEventListener('load', function(event){
  const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

  const cities = [];

//fetch returns a promise
// const prom = fetch(endpoint);
// console.log(prom);

//
//gets back raw data
fetch(endpoint)
  //converts to JSON
  .then(blob => blob.json())
  //then push it into array with spread ... to make each individual item
  .then(data => cities.push(...data))

// console.log(cities);

//filter
function findMatches(wordToMatch, cities){
  return cities.filter(place => {
    //match to input                   g - global, insensitive
    const regex = new RegExp(wordToMatch, 'gi');

    return place.city.match(regex) || place.state.match(regex);
  });
};
// console.log(findMatches('New', cities));

function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


function displayMatches() {
  // console.log(this.value);
  const matchArray = findMatches(this.value, cities);
  // console.log(matchArray);
    const html = matchArray.map(place => {
    //find match for what was searched and replace with span with highlight class
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);

    return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="pop">${numberWithCommas(place.population)}</span>
    </li>
    `;
    //change from array to string
  }).join('');

  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

});
