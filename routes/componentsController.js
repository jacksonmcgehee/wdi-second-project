const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../db/models/User.js')
const Workout = require('../db/models/Workout')
const Component = require('../db/models/Component')


router.get('/', (req, res) => {
    const userId = req.params.userId
    const workoutId = req.params.workoutId
    //console.log(workoutId)
    User.findById(userId)
        .then((user) => {
            const workout = user.workoutsCreated.id(workoutId)
            
            res.render('components/index', {
                workout, 
                user
            })
        })
})

// router.get('/new', (req, res) => {
//     const userId = req.params.userId
//     const workoutId = req.params.workoutId

//     User.findById(userId)
//         .then((user) => {
//             const component = workout.workoutComponent.id()
//                res.render('components/new', {
//                 workout
//             })
//         })
// })

router.post('/', (req, res) => {
    const userId = req.params.userId
    const workoutId = req.params.workoutId
    const newComponent = req.body

    User.findById(userId)
        .then((user) => {
            const workout = user.workoutsCreated.id(workoutId)
            workout.workoutComponent.push(newComponent)
            return user.save()
            
        })
        .then(() => {
            res.redirect(`/users/${userId}/workouts/${workoutId}/components`)
        })
        .catch((error) => {
            console.log(error)
        })
})

router.get('/:componentId/delete', (req, res) => {
    const userId = req.params.userId
    const workoutId = req.params.workoutId
    const componentId = req.params.componentId
    // console.log(`workoutId: ${workoutId}`)
    // console.log(`componentId: ${componentId}`)

    User.findById(userId)
        .then((user) => {
            const workout = user.workoutsCreated.id(workoutId)
            workout.workoutComponent.id(componentId).remove()
            return user.save()
        })
        .then(() => {
            res.redirect(`/users/${userId}/workouts/${workoutId}/components`)
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router