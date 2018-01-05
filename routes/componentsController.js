const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../db/models/User.js')
const Workout = require('../db/models/Workout')
const Component = require('../db/models/Component')


router.get('/', (req, res) => {
    const workoutId = req.params.workoutId
    //console.log(workoutId)
    WorkOut.findById(workoutId)
        .then((workout) => {
            res.render('components/index', {
                workout
            })
        })
})

// router.get('/new', (req, res) => {
//     const workoutId = req.params.workoutId

//     WorkOut.findById(workoutId)
//         .then((workout) => {
//             res.render('components/new', {
//                 workout
//             })
//         })
// })

// router.post('/', (req, res) => {
//     const workoutId = req.params.workoutId
//     const newComponent = req.body

//     WorkOut.findById(workoutId)
//         .then((workout) => {
//             workout.workOutComponent.push(newComponent)
//             return workout.save()
            
//         })
//         .then(() => {
//             res.redirect(`/workouts/${workoutId}/components`)
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// })

// router.get('/:componentId/delete', (req, res) => {
//     const workoutId = req.params.workoutId
//     const componentId = req.params.componentId
//     // console.log(`workoutId: ${workoutId}`)
//     // console.log(`componentId: ${componentId}`)

//     WorkOut.findById(workoutId)
//         .then((workout) => {
//             workout.workOutComponent.id(componentId).remove()
//             return workout.save()
//         })
//         .then(() => {
//             res.redirect(`/workouts/${workoutId}/components`)
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// })

module.exports = router