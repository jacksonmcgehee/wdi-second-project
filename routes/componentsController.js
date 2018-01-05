const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../db/models/User.js')
const Workout = require('../db/models/Workout')
const Component = require('../db/models/Component')

// (Read) Populate a view of all the components of a specific workout
router.get('/', (req, res) => {
    const userId = req.params.userId
    const workoutId = req.params.workoutId
   
    User.findById(userId)
        .then((user) => {
            const workout = user.workoutsCreated.id(workoutId)
            
            res.render('components/index', {
                workout, 
                user
            })
        })
})

// (Create) Add a new componet to a specific workout based on app user input
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

// (Destroy) Delete a specific component of a specific workout
router.get('/:componentId/delete', (req, res) => {
    const userId = req.params.userId
    const workoutId = req.params.workoutId
    const componentId = req.params.componentId
   
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