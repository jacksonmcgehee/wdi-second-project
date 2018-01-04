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

module.exports = router
