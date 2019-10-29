const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Setup empty JS object to act as endpoint for all routes
projectData = {};

const app = express();

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("website"));

app.get("/data", (req, res) => {
  console.log('GET request recieved at /data')
  res.send(projectData);
});

app.post("/", (req, res) => {
  projectData.temperature = req.body.main.temp;
  projectData.conditions = req.body.weather[0].description;
  projectData.feelings = req.body.feelings;
  projectData.date = req.body.date;
  console.log('POST request recieved at /')
  res.end();
});

app.listen(3000, () => console.log("App running on port 3000"));
