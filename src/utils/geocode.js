//https://www.npmjs.com/package/postman-request --> installed request from here
const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic3VuZGVlcGJhc2FrIiwiYSI6ImNsMHdud2EwZzFjZjEzY25tMDl4eGtrcTQifQ.YH3Njz8DC5KMs4KMUfXIVQ&limit=1";

  request({ url: url, json: true }, (error, response) => {
    //when we set json to true, it parses the response
    if (error) {
      callback("Unable to connect to location services.", undefined);
      //2 argument passed to callback
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
// export default geocode;


//**comments** */
//geocoding api - converts address to lat-long pair

//callback takes 2 arguments, one is the error we want to show and the other is the data.
//for handling errors, we set the error to have a message and data to be undefined
//and for handling data, we set the error to be undefined and data to show the desired lat-long-location as an object.

//*could have also used this url - a template literal
/*const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic3VuZGVlcGJhc2FrIiwiYSI6ImNsMHdud2EwZzFjZjEzY25tMDl4eGtrcTQifQ.YH3Njz8DC5KMs4KMUfXIVQ&limit=1`; */