'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
            <article class="country${className}">
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
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

// https://countries-api-836d.onrender.com/countries/

///////////////////////////////////////

/*

const getCountryData = function (country) {
  // old way of wrting AJAX
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
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
};

getCountryData('portugal');
getCountryData('nigeria');

*/

/*
const renderCountry = function (data, className = '') {
  const html = `
        <article class="country${className}">
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
};

const getCountryAndNeighbour = function (country) {
  //  AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    //  converting the data form JSON to javascript object
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Getting neighbour country (2)
    const neighbour = data.borders?.[0];

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('portugal');

*/

// The modern way of writing AJAX call

const request = fetch('https://restcountries.com/v2/name/portugal');
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// getCountryData('portugal');

const getCountryData = function (country) {
  const request = fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};

// getCountryData('portugal');

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
};

// const getNeighbouringCountry = function (country) {
//   // country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(
//       response => {
//         console.log(response);

//         if (!response.ok)
//           throw new Error(`Country not found (${response.status})`);
//         return response.json();
//       }
//       //   err => alert(err)
//     )
//     .then(data => {
//       renderCountry(data[0]);
//       //   const neighbour = data[0].borders?.[0];

//       const neighbour = 'sdsdsds';

//       //   country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.log(`${err} 🎆🎆🎆`);
//       renderError(`Something went wrong🎆🎆🎆. ${err.message}. Try again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getNeighbouringCountry('portugal');
// });

/*

const getNeighbouringCountry = function (country) {
  // country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, `Country not found`)
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];

      if (!neighbour) throw new Error(`${country} has no neighbor`);

      //   country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        `Country not found`
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.log(`${err} 🎆🎆🎆`);
      renderError(`Something went wrong🎆🎆🎆. ${err.message}. Try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getNeighbouringCountry('australia');
});

// getNeighbouringCountry('aaaaaaa');

*/

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}.
The AJAX call will be done to a URL with this format: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=52.508&longitude=13.381. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

/*

// Solution

// Part 1
// 1.
const whereAmI = function (lat, lng) {
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;
  // 2.
  fetch(url)
    .then(response => {
      console.log(response);
      if (!response.ok) throw new Error('Somethng went wrong');
      return response.json();
    })
    .then(data => {
      // 3
      const message = `You are in ${data.city}, ${data.countryName}`;
      console.log(message);
      // Part 2
      return fetch(`https://restcountries.com/v2/name/${data.countryName}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Something went wrong ${response.status}`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      // 4
      console.log(`${err.message}`);
    });
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
console.log(whereAmI(-33.933, 18.474));

btn.addEventListener('click', function () {
  getCountryData(whereAmI(52.508, 13.381));
});

*/

/*
// Proving that callbacks in the callbacks in the microtask queue execute before callbacks in the callback queue
console.log('Test start');

setTimeout(() => console.log('Timer at 0 seconds'), 0);

Promise.resolve('This is promise 1').then(res => console.log(res));

// prove that when task in the microtask queue perform heavy task the callback in the callback queue are delayed till after their execution
Promise.resolve('This is promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});

console.log('Test end');

*/

/*

// using the new Promise() to create a promise

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery Draw going on 🔮');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You Won 💰');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

// cosuming the promise
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// promisfying setTimeOut

const wait = function (seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};
// consuming the promise
wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 second'));

//   creating a promisse that resolves immedietly
Promise.resolve('abc').then(x => console.log(x));
//   creting a promise that throws an error immedietly/ rejects immedietly
Promise.reject(new Error('Problem!')).catch(err => console.error(err));

*/

// navigator.geolocation.getCurrentPosition(
//   postion => console.log(postion),
//   err => console.error(new Error('cant acces your location'))
// );

// Promisifying the geolocation
const getPosition = function () {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(position => resolve(position), err => reject(err))

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(pos => {
//   //   const { latitude: lat, longitude: lng } = pos.coords;
//   //   console.log(lat, lng);
//   console.log(pos);
// });

/*


const whereAmI = function () {
  getPosition()
    .then(postion => {
      const { latitude: lat, longitude: lng } = postion.coords;
      const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;

      return fetch(url);
    })
    .then(response => {
      console.log(response);
      if (!response.ok) throw new Error('Somethng went wrong');
      return response.json();
    })
    .then(data => {
      // 3
      const message = `You are in ${data.city}, ${data.countryName}`;
      console.log(message);
      // Part 2
      return fetch(`https://restcountries.com/v2/name/${data.countryName}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Something went wrong ${response.status}`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      // 4
      console.log(`${err.message}`);
    });
};

btn.addEventListener('click', whereAmI);

*/

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

/*

// Solution

const wait = function (seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

const imageContainer = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const imageElement = document.createElement('img');
    // imageElement.setAttribute('src', imgPath);
    imageElement.src = imgPath;

    imageElement.addEventListener('load', function () {
      imageContainer.append(imageElement);
      resolve(imageElement);
    }),
      imageElement.addEventListener('error', function () {
        reject(new Error('Image not found'));
      });
  });
};

let currentImage;
createImage('img/img-1.jpg')
  .then(imageElement => {
    currentImage = imageElement;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';

    return createImage('img/img-2.jpg');
  })
  .then(imageElement => {
    currentImage = imageElement;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
  })
  .catch(err => console.error(err));

  */

const getPosition2 = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition2();
    const { latitude: lat, longitude: lng } = pos.coords;
    //   Reverse Goecoding
    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
    );
    if (!resGeo.ok) throw new Error('Something went wrong');
    console.log(resGeo);
    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    //   Country data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.countryName}`
    );
    if (!res.ok) throw new Error('Country not found');
    console.log(res);
    const data = await res.json();
    console.log(data[0]);
    renderCountry(data[0]);
  } catch (err) {
    console.error(`${err} 🎆`);
    renderError(`🎆 ${err.message}`);
  }
};

whereAmI();
console.log('First');
