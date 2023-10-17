const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, "description is required"],
        trim: true
    },
    duration: {
        type: Number,
        required: [true, "Duration is required "],
    },
    ratings: {
        type: Number,
        default: 1.0
    },
    totalRating: {
        type: Number,
    },
    releaseYear: {
        type: Number,
        required: [true, "Release year is require"]
    },
    releaseDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    genres: {
        type: [String],
        required: [true, "Genres is require"]
    },
    directors: {
        type: [String],
        required: [true, "Director is required"]
    },
    coverImage: {
        type: String,
        require: [true, "Cover Image is require"]
    },
    actors: {
        type: [String],
        required: [true, "actors are required"]
    },
    price: {
        type: Number,
        require: [true, "Price is Required"]
    },
})
const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;