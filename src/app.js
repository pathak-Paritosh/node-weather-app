const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { geocode } = require("./utils/geocode");
const { forecast } = require("./utils/forecast");

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.get("/", (req, res) => {
    res.render("index", {
        name: "Paritosh",
        title: "Weather"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Paritosh",
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        msg: "Contact to get help!",
        title: "Help",
        name: "Paritosh",
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.city || !req.query.country){
        return res.send({
            error: "Address not provided"
        })
    }

    const city = req.query.city;
    const country = req.query.country;
    geocode(city, country, (error, data) => {
        if(error){
            return res.send({
                error
            });
        }
        forecast(data.latitude, data.longitude, (error, data) => {
            if(error){
                return res.send({
                    error
                });
            }
            res.send({
                forecast: data.weather[0].description,
                temperature: data.main.temp
            });
        })
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Paritosh",
        errorMessage: "Help article not found"
    });
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Paritosh",
        errorMessage: "Page not found"
    });
})

app.listen(3000);