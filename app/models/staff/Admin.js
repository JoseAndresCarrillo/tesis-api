const mongoose = require('mongoose')
const authSchema = require('./_auth')

var employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  auth: {
    type: authSchema,
    required: true
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://placehold.it/400'
  }
}, {
  toJSON: { virtuals: true }
})

module.exports = mongoose.model('Employee', employeeSchema)
