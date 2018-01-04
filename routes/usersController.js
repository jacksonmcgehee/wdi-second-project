const express = require('express')
const router = express.Router()
const User = require('../db/models/User.js')


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

router.get('/new', (req, res) => {
  res.render('users/new')
})

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

router.get('/:userId', (req, res) => {
  const userId = req.params.userId
  
  User.findById(userId)
    .then((user) => {
      res.render('users/show', {
        user
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

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
