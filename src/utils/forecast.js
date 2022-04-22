const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c7b39430bf6ad4dbc6857a38d613fd41&query=${latitude},${longitude}&units=m`;

  request({ url: url, json: true }, (error, response) => {
    //when we set json to true, it parses the response
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (response.body.error) {
      callback("Unable to find location.", undefined);
    } else {
      callback(undefined, {
        weather: response.body.current.weather_descriptions[0],
        temperature: response.body.current.temperature,
        feelsLikeTemperature: response.body.current.feelslike,
        humidity: response.body.current.humidity,
      });
    }
  });
};

module.exports = forecast;
//export default forecast;

//**destructuring */
//request({ url: url, json: true }, (error, response) => {
//--> can be written as
// request({ url, json: true }, (error, {body}) => {
//response is an object which has many properties, out of which one is body and here we are using only the body property, so we can extract body from the response object by destructuring
//in that case we can omit response, where we have written. eg: response.body.current.etcetc --> body.current.etcetc
//*similar destructuring can be done in geocode too.

//****comments*** */
//default unit is --> celsius or metric units
//we can convert to diff units by --> &units=f in the url of the weatherstack api

/*we need to additionally parse the json data if we didnt set the json to true, if we set the json to true, then we need not do it separately.
request({ url: url }, (error, response) => {
    // console.log(response.body); //jsondata
    const data = JSON.parse(response.body); //object
    // console.log(data);
    console.log(data.current);
}) 
*/

//callback takes 2 arguments, one is the error we want to show and the other is the data.
//for handling errors, we set the error to have a message and data to be undefined
//and for handling data, we set the error to be undefined and data to show the desired lat-long-location as an object.

/* 
console.log(
      response.body.current.weather_descriptions[0] +
        " It is currently " +
        temperature +
        " degrees out. It feels like " +
        feelsLikeTemperature +
        " degrees out."
    ); */
