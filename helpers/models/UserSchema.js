const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    profilePic: {
        type: String
    },
    information: {
        type: String
    },
    sound: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', function (next) {//Don't change to arrow function..
    if (!this.isModified('password')) next()//return next()

    bcrypt.hash(this.password, 10).then(hash => {
        this.password = hash
        next()
    })
})

module.exports = mongoose.model('User', userSchema)