const express = require("express")
const bodyParser = require("body-parser")
const https = require('https');

const app = express()
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req,res){
    const city = req.body.city
    const units = "metric"
    const appid = EnterAppId
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + units + "&appid=" + appid
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const weatherDescription = weatherData.weather[0].description
            const temp = weatherData.main.temp
            const icon = weatherData.weather[0].icon
            const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<h1>The temperature is " + temp + "</h1>")
            res.write("<p>Current Weather Condition of " + city + ": " + weatherDescription + "</p>")
            res.write("<img src=" + iconUrl + ">")
            res.send()
        })
    })
})

app.listen(3000, function(){
    console.log("Listening on port 3000")
})
