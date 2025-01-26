'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

// https://countries-api-836d.onrender.com/countries/

///////////////////////////////////////

// old way of wrting AJAX
const request = new XMLHttpRequest();
request.open('GET', 'https://restcountries.com/v2/name/portugal');
request.send();

request.addEventListener('load', function () {
  //  converting the data form JSON to javascript object
  const data = JSON.parse(this.responseText);
  console.log(data);
});

const request2 = new XMLHttpRequest();
request2.open('GET', 'https://restcountries.com/v2/name/nigeria');
request2.send();

request2.addEventListener('load', function () {
  const [data2] = JSON.parse(this.responseText);
  console.log(data2);
});
