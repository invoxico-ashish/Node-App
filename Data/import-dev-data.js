// make thsi function only for run mongodb and import and delete data using terminal cmds 
// node Data/import-dev-data.js --import
// node Data/import-dev-data.js --delete  run these commands

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Movie = require("./../Modals/movieModal");

dotenv.config({ path: "./config.env" });

mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true
}).then(conn => {
    console.log("db connection successhkfbyg");
}).catch(err => {
    console.log(err);
});


//Read movies.json file
const movies = JSON.parse(fs.readFileSync("./Data/movies.json", "utf-8"))
const deleteMovies = async () => {
    try {
        await Movie.deleteMany();
        console.log("data deleted successfully");
    } catch (error) {
        console.log(error);
    };
    process.exit();
};

const importMovies = async () => {
    try {
        await Movie.create(movies);
        console.log('data imported successfully');
    } catch (error) {
        console.log(error);
    };
    process.exit();
};
if (process.argv[2] === "--import") {
    importMovies();
}
if (process.argv[2] === "--delete") {
    deleteMovies();
}