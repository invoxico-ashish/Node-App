const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Movie = require("./../Modals/movieModal");

dotenv.config({ path: "./config.env" });

mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true
})
