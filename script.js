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
  const [data] = JSON.parse(this.responseText);
  console.log(data);

  const html = `
          <article class="country">
            <img class="country__img" src="${data.flag}"/>
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  +data.population / 1000000
                ).toFixed(1)} people</p>
                <p class="country__row"><span>🗣️</span>${
                  data.languages[0].name
                }</p>
                <p class="country__row"><span>💰</span>${
                  data.currencies[0].name
                }</p>
          </div>
        </article>
        `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
});

const request2 = new XMLHttpRequest();
request2.open('GET', 'https://restcountries.com/v2/name/nigeria');
request2.send();

request2.addEventListener('load', function () {
  const [data2] = JSON.parse(this.responseText);

  const html2 = `
    <article class="country">
        <img class="country__img" src="${data2.flag}"/>
        <div class="country__data">
            <h3 class="country__name">${data2.name}</h3>
            <h4 class="country__region">${data2.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data2.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${
              data2.languages[0].name
            }</p>
            <p class="country__row"><span>💰</span>${
              data2.currencies[0].name
            }</p>
        </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html2);
  console.log(data2);
});
