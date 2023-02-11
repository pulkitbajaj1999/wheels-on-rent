const mongoose = require('mongoose')
const Schema = mongoose.Schema

// define model structure
const userSchema = new Schema({
  profile: {
    type: Schema.Types.Mixed,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN', 'CUSTOMER', 'AGENT'],
  },
})

module.exports = mongoose.model('User', userSchema)
