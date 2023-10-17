const Movie = require("../Modals/movieModal")


exports.getAllMovie = async function (req, res) {
    try {
        console.log(req.query);
        let  qurstr = JSON.stringify(req.query);
        qurstr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        const queryObj = JSON.parse(qurstr);
        console.log(queryObj)
        const movies = await Movie.find(queryObj);
        // return
        //add + for convert string into number; { duration: +req.query.duration, rating: +req.query.rating }
        // const movies = await Movie.find().where('duration').equals(req.query.duration).where("ratings").equals(req.query.ratings)
        return res.status(200).json({ status: "success", length: movies.length, data: { movies } })
    } catch (error) {
        return res.status(400).json({ status: "failed", error })
    }
}
exports.createMovie = async function (req, res) {
    try {
        const movie = await Movie.create(req.body);
        return res.status(201).json({ status: "success", data: { movie } })
    } catch (error) {
        return res.status(400).json({ status: "failed", message: error.message })
    }
}
exports.getSingleMovie = async function (req, res) {
    // const id = req.params.id * 1; // * 1 means req.parama.id return string and we convert it into a number by * 1 or we do id = +req.params.id
    try {
        const movie = await Movie.findById(req.params.id)
        return res.status(200).json({ status: "success", data: { movie } })
    } catch (error) {
        return res.status(400).json({ status: "failed", message: error.message })
    }
}
exports.updateMovie = async function (req, res) {
    try {
        const updatedMovies = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        return res.status(200).json({ status: "success", data: { movie: updatedMovies } })
    } catch (error) {
        return res.status(400).json({ status: "failed", message: error.message })
    }
}
exports.deleteMovie = async function (req, res) {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        return res.status(200).json({ status: "success", data: null })
    } catch (error) {
        return res.status(400).json({ status: "failed", message: error.message })
    }
}