const express = require("express");
const moviesController = require("../Controllers/moviesController")


const router = express.Router();

router.param("id", (req, res, next, value) => {
    console.log("movie id is" + value)
    next();
})


//get api for movies;
router.route('/').get(moviesController.getAllMovie)
    .post(moviesController.createMovie)
// /api/v1/movie/:id/:name?/:x?  which means thses params/parameters are optional
router.route('/:id').get(moviesController.getSingleMovie)
    .patch(moviesController.updateMovie)
    .delete(moviesController.deleteMovie)

module.exports = router;