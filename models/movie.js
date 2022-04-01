const mongoose = require('mongoose')
const Schema = mongoose.Schema


const movieSchema = new Schema({
    name: String,
    genre: String,
    directorId: String,
    watched: Boolean,
    rate: Number,
})

module.exports = mongoose.model('movies', movieSchema)