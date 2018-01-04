const mongoose = require('mongoose')
const Schema = require('../schema.js')

const Workout = mongoose.model('Workout', Schema.WorkoutSchema)

module.exports = Workout