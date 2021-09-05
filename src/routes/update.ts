const router2 = require("express").Router();
import {movie} from "../components/models";

router2.route('/:id').post(async (req: any, res: any) => {
  /**
  This router receives:
  (1) new Personal Rating from request
  (2) IMDB ID from URL parameter
  and updates the movie rating accordingly.
  **/

  const filter = {"imdbID": req.params.id}
  const update = {"Personal_rating": req.body.Personal_rating}
  const params = { runValidators: true }

  await movie.updateOne(filter, update, params);
  res.json("Updated successfully.")
})


module.exports = router2;
