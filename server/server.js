const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
const axios = require("axios");

// add your endpoints here
app.get("/", (request, response) => response.json("Root route for art-moveau"));

app.get("/movie", async (request, response) => {
  const { search } = request.query;
  const movieAPI = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${process.env.TMDB_ACCESS_KEY}`;
  //different way of using axios to get data
  const options = {
    method: "GET",
    url: movieAPI,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.BEARER}`,
    },
  };
  const res = await axios.request(options);

  const wrangledData = {
    title: res.data.results[0].title,
    poster: `https://image.tmdb.org/t/p/w500${res.data.results[0].poster_path}`,
  };
  response.json(wrangledData);
});
app.listen(PORT, () => console.log(`App is running PORT ${PORT}`));
