const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../db/models/User.js')
const Workout = require('../db/models/Workout')


router.get('/newworkout', (req, res) => {
    const userId = req.params.userId
    User.findById(userId)
    .then((user) => {
      res.render('workouts/new', {
        user
      })
    })
  })

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