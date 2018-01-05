const express = require('express')
const router = express.Router()
const User = require('../db/models/User.js')
const Workout = require('../db/models/Workout')

// (Read) Users 'home' page
router.get('/', (req, res) => {
  User.find({})
    .then((user) => {
        res.render('users/index', {
           user
        })
    })
    .catch((error) => {
        console.log(error)
    })
})

// (Read) Provide the add new user page
router.get('/new', (req, res) => {
  res.render('users/new')
})

// (Create) Populate a new user based on app user input
router.post('/', (req, res) => {
  const newUser = req.body
  
  User.create(newUser)
    .then(() => {
      res.redirect('/users')
    })
    .catch((error) => {
      console.log(error)
    })
})

// (Read) Populate a page with all workouts from all users
router.get('/workouts', (req, res) => {
  User.find({})
  .then((user) => {
      res.render('workouts/index', {
          user
      })
  })
  .catch((error) => {
      console.log(error)
  })
})

// (Read) Detailed view of an individual user
router.get('/:userId', (req, res) => {
  const userId = req.params.userId
  
  User.findById(userId)
    .then((user) => {
      res.render('users/show', {
        user,
        userId
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

// (Read) Provide the page to edit individual user information
router.get('/:userId/edit', (req, res) => {
  const userId = req.params.userId

  User.findById(userId)
    .then((user) => {
      res.render('users/edit', {
        user,
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

// (Update) Change the detailed user information based on app user input
router.put('/:userId', (req, res) => {
  const userId = req.params.userId
  const updatedUserInfo = req.body

  User.findByIdAndUpdate(userId, updatedUserInfo, {new: true})
    .then(() => {
      res.redirect(`/users/${userId}`)
    })
})

// (Destroy) Delete a specific user
router.get('/:userId/delete', (req, res) => {
  const userId = req.params.userId
  User.findByIdAndRemove(userId)
      .then(() => {
          res.redirect('/users')
      })
      .catch((error) => {
          console.log(error)
      })
})

module.exports = router
