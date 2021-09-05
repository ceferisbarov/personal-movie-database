const router1 = require("express").Router();
import {movie} from "../components/models";

router1.route('/:rating?').get(async (req: any, res: any) => {
  /**
  This router provides list of movies in the database.
  Rating is an optional parameter that can be used for filtering.
  **/
  const rating = req.params.rating

  if(rating === undefined){
    const query = await movie.find({})
    res.json(query)
  }
  else{
    const query = await movie.find({Personal_rating: rating})
    res.json(query)
  }
})

module.exports = router1;
