const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const regex = require('../../util/regex')

var authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: regex.email,
    index: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  _id: false
})

authSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
    }
    next()
  } catch (e) {
    next(e)
  }
})

authSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password)
}

module.exports = authSchema
