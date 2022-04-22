const path = require("path"); //node module
const express = require("express"); //express is a func
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

//creating a new variable to store our express application
const app = express();

//define paths for express config
const publicDirectorypath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setting hbs as the default view engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath); //using customised name
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectorypath));

//to load dynamic web pages --> route: /
app.get("/", (req, res) => {
  res.render("index", {
    //index is the name of the view to render
    pageName: "Home Page",
    name: "Sundeep Basak",
  });
});

//route: /about
app.get("/about", (req, res) => {
  res.render("about", {
    pageName: "About Page",
    name: "Sundeep Basak",
    degree: "BSc Chemistry",
    profession: "Full-Stack Web Developer",
  });
});

//route: /contact
app.get("/contact", (req, res) => {
  res.render("contact", {
    pageName: "Contact Page",
    name: "Sundeep Basak",
    email: "sundeep15basak@gmail.com",
    phone: 6900244412,
  });
});

app.get("/products", (req, res) => {
  //console.log(req.query); //query is an object containing the query string of a url
  if (!req.query.category) {
    //category is the name of query parameter
    return res.send({
      error: "You must provide a name term",
    });
  }
  console.log(req.query.category);
  res.send({
    products: [],
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide a location",
    });
  }
  geocode(req.query.address, (geoError, { latitude, longitude, location } = {}) => {
    if (geoError) {
      return res.send({ geoError });
    }
    forecast(latitude, longitude, (forecastError, forecastData) => {
      if (forecastError) {
        return res.send({ forecastError });
      }
      res.send({
        location,
        forecast: forecastData,
        address: req.query.address,
      });
    });
  });
  // res.send({
  //   forecast: "it is snowing",
  //   location: "Mumbai",
  //   address: req.query.address,
  // });
});

//route: /contact/anything
app.get("/contact/*", (req, res) => {
  res.render("404page", {
    name: "Sundeep Basak",
    pageName: "404 contact page",
    errorMessage: "Contact Info Not Found",
  });
});

//route: /anything --> show 404page
app.get("*", (req, res) => {
  res.render("404page", {
    name: "Sundeep Basak",
    pageName: "404 page",
    errorMessage: "Page Not Found!!",
  });
});

//this is used to start a server
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

//****comments  */
//our-domain.com
//our-domain.com/about etc etc
//all of these routes are going to run on a single express server

//prints absolute path
// console.log(__dirname); //prints directory
// console.log(__filename); //prints filename

//The path node module provides utilities for working with file and directory paths.

//prints the absolute path of index.html file
//console.log(path.join(__dirname, ('../public/index.html')));

//to load static web-pages
// app.use("/", express.static(myHtmlFile));

//to load our views --> index.hbs, about.hbs, etc
//we have to have a folder name views to load those files, as we are setting up a view engine, and it only looks for the views folder.

//to change the folder name (eg: templates), we have to first store the template folder path in a variable(here viewsPath),
//and then --> app.set("views", viewsPath)

//**challenge--> update weather endpoint to accept address
//1. no adress --> send back an error msg
//2. address --> send back the static JSON

//**after copying folder of utils in the web-server
//all console.log() calls will be converted to res.send()

//**challenge: wire up /weather
//1. require geocode/forecast into app.js
//2. use the address to geocode
//3. use the coordinated to get forecast
//4. send back the real forecast and location

//**default parameter(as an empty object--> {}) is reqd while destructuring an object and using it inside a func --> for reference --> see playground folder -> default-param.js file