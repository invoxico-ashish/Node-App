const express = require("express");
const fs = require("fs");
const app = express();
const morgan = require("morgan")

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"))
}
app.use(express.static("./public"))
app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString();
    next();
})
app.use('/api/v1/movies', require("./Routes/moviesRoute"))
module.exports = app