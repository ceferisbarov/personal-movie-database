const router = require("express").Router();
import {movie} from "../components/models";
import { MongoError } from "mongodb";
var request = require('request-promise');

router.route('/').post(async (req: any, res: any) => {
  /**
  This router receives a request composed of:
  (1) IMDB ID of the movie
  (2) User rating

  Uses the IMDB ID to retrieve the necessary data from the OMDB API

  Saves the resulting Document to MongoDB
  **/
  var newMovie: import("mongoose").Document<any, any, unknown>;
  const imdbID = req.body.id;
  const personal_rating = req.body.rating;

  const url = 'http://www.omdbapi.com/?i=' + imdbID + "&apikey=df7d797d"

  await request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const movieJSON = JSON.parse(body)

      const title = movieJSON.Title==="N/A" ? null : movieJSON.Title;
      const year = movieJSON.Year==="N/A" ? null : movieJSON.Year;
      const genre = movieJSON.Genre==="N/A" ? null : movieJSON.Genre;
      const metascore = movieJSON.Metascore==="N/A" ? null : movieJSON.Metascore;

      newMovie = new movie({
                  "imdbID": imdbID,
                  "Title": title,
                  "Year": year,
                  "Genre": genre,
                  "Metascore": metascore,
                  "Personal_rating": personal_rating
                })
    }

  newMovie.save(function(err: MongoError) {
    if (err) {
      if (err.code === 11000) {
        // Duplicate username
        return res.status(422).send({ succes: false, message: "Movie already exist!" });
      }
      else{
              // Some other error
        return res.status(422).send(err);
      }
    }

      res.json({
        success: true,
        message: "Movie added."
      })
  })
})})

module.exports = router;
