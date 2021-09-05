const router2 = require("express").Router();
import {movie} from "../components/models";

router2.route('/:id').post(async (req: any, res: any) => {
  /**
  This router is used to delete the documents by ID.
  **/
  await movie.deleteOne({ "imdbID": req.params.id }, function(err){
    return res.status(422).send(err);
  });
  res.json({
            success: true,
            message: "Deleted successfully."
          })
})

module.exports = router2;
