const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../db/models/User.js')

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

// router.get('/:workoutId', (req, res) => {
//     const workoutId = req.params.workoutId
//     const userId = req.params.userId
//     User.findById(userId)
//         .then((user) => {
//             res.render('workouts/show', {
//                 user
//             })
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// })

// router.get('/:workoutId/edit', (req, res) => {
//     const workoutId = req.params.workoutId
//     Workout.findById(workoutId)
//         .then((workout) => {
//             res.render('workouts/edit', {
//                 workout
//             })
//         })
//         .catch((error) => {
//             consoole.log(error)
//         })
// })

// router.put('/:workoutId', (req, res) => {
//     const workoutId = req.params.workoutId
//     const updatedWorkout = req.body

//     Workout.findByIdAndUpdate(workoutId, updatedWorkout, {new: true})
//         .then(() => {
//             res.redirect(`/workouts/${workoutId}`)
//         })
// })

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