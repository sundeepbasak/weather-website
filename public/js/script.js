console.log("Client Side Javascript file is loaded");
//this is the client side js, and here we are going to load the weather data from our express-server
//we will use fetch

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(search.value); //prints the input value
  const inputLocation = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`http://localhost:3000/weather?address=${inputLocation}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else if (data.geoError) {
        messageOne.textContent = data.geoError;
      } else {
        const forecastMessage = `${data.forecast.weather} today. Currently ${data.forecast.temperature}\xB0C. Feels like ${data.forecast.feelsLikeTemperature}\xB0C.`;

        messageOne.textContent = data.location;
        messageTwo.textContent = forecastMessage;
      }
    });
});

//here forecast is also an object containing 3 properties.

//**comments */
/* //**one way of writing fetch-api syntax 
fetch("https://puzzle.mead.io/puzzle")
  .then((response) => response.json())
  .then((data) => console.log(data)); 
*/

/* //**another way of writing fetch syntax
fetch("https://puzzle.mead.io/puzzle")
.then((response) => { response.json()
.then((data) => console.log(data));
}) 
*/
