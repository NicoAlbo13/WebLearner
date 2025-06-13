import express from "express";
import bodyParser from "body-parser";
import axios from "axios";


const API_KEY = 'a65cf8a04c06bf36e6a83ec68d40f700';
const API_URL = `https://api.weatherstack.com/current?access_key=${API_KEY}`;

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {response: false});
});

app.post("/weather", async (req, res)=>{
    console.log(req.body);
    const options = {
        method: 'GET',
        url: API_URL,
        params: {
            query: req.body.country,
            units: 'f',
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        res.render("index.ejs", {response: true, temp: response.data.current.temperature, icon: response.data.current.weather_icons[0]})
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
