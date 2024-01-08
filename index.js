const express=require('express');
const app=express();
const bodyparser=require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views','./Views')
const https=require('https')
let axios=require('axios')




app.get('/weather', async(req,res)=>{

res.render('weather')
   
})  
app.post('/weather', async (req, res) => {
  try {
      const weather = req.body.weather;
      const apiKey = 'bf5dfdfae8848c9763983934045d2bb3'; // Replace with your OpenWeatherMap API key
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weather}&appid=${apiKey}`;

     const response=await axios.get(apiUrl);
     const weatherData=response.data
    console.log(weatherData)
      const tempdata = weatherData.main.temp;
      let newtemp= (tempdata -273)
      const name = weatherData.name;
      const speed = weatherData.wind.speed;


      res.render('weatherData', { temp: Math.floor(newtemp), name: name, speed: speed });
  } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching weather data');
  }
});
app.listen(5000,()=>{
    console.log("server start on port 5000")
})


