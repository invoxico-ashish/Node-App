const express = require("express");
const fs = require("fs");
const app = express();


app.use(express.json());

let movies = JSON.parse(fs.readFileSync("./Data/movies.json"));
//get api for movies;
app.get('/api/v1/movies', function (req, res) {
    res.status(200).json({
        success: "true",
        count: movies.length,
        data: {
            movies: movies
        }
    })
})
//post request 
app.post("/api/v1/movie", function (req, res) {
    const newId = movies[movies.length - 1].id + 1;
    const newMovie = Object.assign({ id: newId }, req.body)
    movies.push(newMovie);
    fs.writeFile("./Data/movies.json", JSON.stringify(movies), (err) => {
        res.status(200).json({ status: "success", data: { movie: newMovie } })
    })
})
//get movie
// /api/v1/movie/:id/:name?/:x?  which means thses params/parameters are optional
app.get('/api/v1/movie/:id', function (req, res) {
    const id = req.params.id * 1; // * 1 means req.parama.id return string and we convert it into a number by * 1 or we do id = +req.params.id
    const movie = movies.find(el => el.id === id);

    if (!movie) {
        return res.status(404).json({ status: "fail", message: "movie with id " + id + " is not found" })
    }
    return res.status(200).json({ status: "success", data: { movie: movie } })
})
// update movie
app.patch('/api/v1/movie/:id', function (req, res) {
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
})
//DELETE Movie 
app.delete("/api/v1/movies/:id", function (req, res) {
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
})
const port = 5000;
app.listen(port, function () {
    console.log(`server is running on port ${port}`)
})