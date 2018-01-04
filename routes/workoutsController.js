const express = require('express')
const router = express.Router({ mergeParams: true })
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

router.post('/', (req, res) => {
    const newWorkout = req.body

    Workout.create(newWorkout)
        .then(() => {
            res.redirect('/workouts')
        })
        .catch((error) => {
            console.log(error)
        })
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

router.get('/:workoutId/edit', (req, res) => {
    const workoutId = req.params.workoutId
    Workout.findById(workoutId)
        .then((workout) => {
            res.render('workouts/edit', {
                workout
            })
        })
        .catch((error) => {
            consoole.log(error)
        })
})

router.put('/:workoutId', (req, res) => {
    const workoutId = req.params.workoutId
    const updatedWorkout = req.body

    Workout.findByIdAndUpdate(workoutId, updatedWorkout, {new: true})
        .then(() => {
            res.redirect(`/workouts/${workoutId}`)
        })
})

router.get('/:workoutId/delete', (req, res) => {
    const workoutId = req.params.workoutId
    Workout.findByIdAndRemove(workoutId)
        .then(() => {
            res.redirect('/workouts')
        })
        .catch((error) => {
            console.log(error)
        })
})






module.exports = router