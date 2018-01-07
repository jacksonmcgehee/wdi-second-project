const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index')
})

router.get('/about', (req, res) => {
  res.render('about')
})



module.exports = router
