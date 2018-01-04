const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../db/models/User.js')
const Workout = require('../db/models/Workout')

// router.get('/', (req, res) => {
//     User.find({})
//     .then((user) => {
//         res.render('workouts/index', {
//             user
//         })
//     })
//     .catch((error) => {
//         console.log(error)
//     })
// })

// router.get('/new', (req, res) => {
//     res.render('workouts/new')
// })

// router.post('/', (req, res) => {
//     const newWorkout = req.body

//     Workout.create(newWorkout)
//         .then(() => {
//             res.redirect('/workouts')
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// })

router.get('/:workoutId', (req, res) => {
    const workoutId = req.params.workoutId
    const userId = req.params.userId
    User.findById(userId)
        .then((user) => {
            const workout = user.workoutsCreated.id(workoutId)
            res.render('workouts/show', {
                user,
                workout
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

router.get('/:workoutId/edit', (req, res) => {
    const workoutId = req.params.workoutId
    const userId = req.params.userId
    User.findById(userId)
        .then((user) => {
            const workout = user.workoutsCreated.id(workoutId)
            res.render('workouts/edit', {
                user,
                workout
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

router.put('/:workoutId', (req, res) => {
    const workoutId = req.params.workoutId
    const userId = req.params.userId
    const updatedWorkout = req.body

    Workout.findByIdAndUpdate(workoutId, updatedWorkout, {new: true})
        .then(() => {
            res.redirect(`/users/${userId}/workouts/${workoutId}`)
        })
})

// router.get('/:workoutId/delete', (req, res) => {
//     const workoutId = req.params.workoutId
//     Workout.findByIdAndRemove(workoutId)
//         .then(() => {
//             res.redirect('/workouts')
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// })






module.exports = router