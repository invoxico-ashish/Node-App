const express = require("express");
const fs = require("fs");
const app = express();
const morgan = require("morgan")

app.use(express.json());
app.use(morgan("dev"))
app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString();
    next();
})
app.use('/api/v1/movies', require("./Routes/moviesRoute"))
module.exports = app