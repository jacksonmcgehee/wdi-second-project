const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../db/models/User.js')
const Workout = require('../db/models/Workout')

// (Read) Provide a way to input info for a new workout
router.get('/newworkout', (req, res) => {
    const userId = req.params.userId
    User.findById(userId)
    .then((user) => {
      res.render('workouts/new', {
        user
      })
    })
  })

// (Create) Add a new workout to a user based on app user input
router.post('/', (req, res) => {
    const workoutId = req.params.workoutId
    const userId = req.params.userId
    const newWorkout = req.body

    User.findById(userId)
        .then((user) => {
            user.workoutsCreated.push(newWorkout)
            return user.save()
        })
        .then(() => {
            res.redirect(`/users/${userId}`)
        })
        .catch((error) => {
            console.log(error)
        })
})

// (Read) Provide a way for the app user to change info about an individual workout
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

// (Update) Change existing workout based on app user input
router.put('/:workoutId', (req, res) => {
    const workoutId = req.params.workoutId
    const userId = req.params.userId
    const updatedWorkout = req.body

    User.findByIdAndUpdate(userId)
    .then((user) => {
        const workoutToEdit = user.workoutsCreated.id(workoutId)

        workoutToEdit.workoutName = updatedWorkout.workoutName
        workoutToEdit.goal = updatedWorkout.goal
        workoutToEdit.notes = updatedWorkout.notes
        return user.save()
        
    })
    .then(() => {
        res.redirect(`/users/${userId}/workouts/${workoutId}`)
    })
    .catch((error) => {
        console.log(error)
    })
})

// (Destroy) Delete a specific workout
router.get('/:workoutId/delete', (req, res) => {
    const workoutId = req.params.workoutId
    const userId = req.params.userId
    User.findById(userId)
        .then((user) => {
            const workout = user.workoutsCreated.id(workoutId).remove()
            return user.save()
        })
        .then((user) => {
            res.redirect(`/users/${userId}`)
        })
        .catch((error) => {
            console.log(error)
        })
})

// (Read) Show the details of an individual workout
router.get('/:workoutId', (req, res) => {
    const workoutId = req.params.workoutId
    const userId = req.params.userId
    User.findById(userId)
        .then((user) => {
            const workout = user.workoutsCreated.id(workoutId)
            res.render('workouts/show', {
                workout,
                user
            })
        })
        .catch((error) => {
            console.log(error)
        })
  })




module.exports = router