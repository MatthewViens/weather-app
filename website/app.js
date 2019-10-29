/* Global Variables */
const apiURL = `http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=`;
const apiKey = ",us&appid=bc79430944174e3947615df0a1663964";
const generateButton = document.getElementById("generate");
const zipInput = document.getElementById("zip");
const feelingsInput = document.getElementById("feelings");
const dateHolder = document.getElementById("date");
const tempHolder = document.getElementById("temp");
const contentHolder = document.getElementById("content");
const currentEntry = document.querySelector(".entry");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const validateZip = () => {
  zipData = zipInput.value;
  zipregexp = /^\d{5}$/;
  if (zipregexp.test(zipData)) {
    generateButton.removeAttribute("disabled");
    generateButton.style.opacity = 1;
  } else {
    generateButton.setAttribute("disabled", "disabled");
    generateButton.style.opacity = 0.5;
  }
};

const getData = async (url = "") => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
};

const updateUI = async () => {
  const projectData = await getData("/data");
  dateHolder.innerHTML = `${projectData.date}`;
  tempHolder.innerHTML = `${projectData.temperature}℉ - ${projectData.conditions}`;
  contentHolder.innerHTML = projectData.feelings;
  currentEntry.style.visibility = "visible";
};

const generate = async () => {
  const zip = zipInput.value;
  const response = await fetch(`${apiURL}${zip}${apiKey}`);
  try {
    const data = await response.json();
    data.feelings = feelingsInput.value;
    data.date = newDate;
    await postData("/", data);
    updateUI();
  } catch (error) {
    console.error("Error", error);
  }
};

generateButton.addEventListener("click", generate);
zipInput.addEventListener("input", validateZip);
