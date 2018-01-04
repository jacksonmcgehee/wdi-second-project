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

router.get('/new', (req, res) => {
    res.render('workouts/new')
})

router.get('/:workoutId', (req, res) => {
    const workoutId = req.params.workoutId
    Workout.findById(workoutId)
        .then((workout) => {
            res.render('workouts/show', {
                workout
            })
        })
        .catch((error) => {
            console.log(error)
        })
})






module.exports = router