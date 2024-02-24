const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
// Example static files configuration in Express.js
app.use(express.static('public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/weather', async (req, res) => {
  res.render('weather');
});

app.post('/weather', async (req, res) => {
  try {
    const weather = req.body.weather;
    const apiKey = 'bf5dfdfae8848c9763983934045d2bb3'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weather}&appid=${apiKey}`;

    const response = await axios.get(apiUrl);

    if (!response || response.status !== 200) {
      console.error('Error in API request:', response && response.statusText);
      res.status(500).send('Error fetching weather data');
      return;
    }

    const weatherData = response.data;
    const tempdata = weatherData.main.temp;
    let newtemp = tempdata - 273;
    const name = weatherData.name;
    const speed = weatherData.wind.speed;

    res.render('weatherData', { temp: Math.floor(newtemp), name: name, speed: speed });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching weather data');
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
