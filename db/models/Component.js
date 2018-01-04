const mongoose = require('mongoose')
const Schema = require('../schema.js')

const Component = mongoose.model('Component', Schema.ComponentSchema)

module.exports = Component