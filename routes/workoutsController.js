const express = require('express')
const router = express.Router()
const Workout = require('../db/models/Workout.js')

router.get('/', (req, res) => {
    Workout.find({})
    .then((workout) => {
        res.render('workouts/index', {
            workout
        })
    })
    .catch((error) => {
        console.log(error)
    })
})






module.exports = router