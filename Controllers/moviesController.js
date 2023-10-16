const fs = require("fs");
const movies = JSON.parse(fs.readFileSync("./Data/movies.json"))



exports.getAllMovie = function (req, res) {
    return res.status(200).json({ success: "true", count: movies.length, data: { movies: movies } })
}
exports.createMovie = function (req, res) {
    const newId = movies[movies.length - 1].id + 1;
    const newMovie = Object.assign({ id: newId }, req.body)
    movies.push(newMovie);
    fs.writeFile("./Data/movies.json", JSON.stringify(movies), (err) => {
        res.status(200).json({ status: "success", data: { movie: newMovie } })
    })
}
exports.getSingleMovie = function (req, res) {
    const id = req.params.id * 1; // * 1 means req.parama.id return string and we convert it into a number by * 1 or we do id = +req.params.id
    const movie = movies.find(el => el.id === id);
    if (!movie) {
        return res.status(404).json({ status: "fail", message: "movie with id " + id + " is not found" })
    }
    return res.status(200).json({ status: "success", data: { movie: movie } })
}
exports.updateMovie = function (req, res) {
    let id = req.params.id * 1;
    let movieToUpdate = movies.find(el => el.id === id);
    if (!movieToUpdate) {
        return res.status(404).json({ status: "failed" })
    }
    let index = movies.indexOf(movieToUpdate)
    Object.assign(movieToUpdate, req.body);
    movies[index] = movieToUpdate;
    fs.writeFile("./Data/movies.json", JSON.stringify(movies), (err) => {
        res.status(200).json({ status: "success", data: { movie: movieToUpdate } })
    })
}
exports.deleteMovie = function (req, res) {
    const id = req.params.id * 1;
    const movieToDelete = movies.find(el => el.id === id);
    if (!movieToDelete) {
        return res.status(404).json({ status: "fail", message: "No Movie object with " + id + " id found" })
    }
    const index = movies.indexOf(movieToDelete);
    movies.splice(index, 1);
    fs.writeFile("./Data/movies.json", JSON.stringify(movies), (err) => {
        res.status(204).json({ status: "success", data: { movie: null } })
    })
}