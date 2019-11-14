const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const mongoosastic = require('mongoosastic')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,// es_indexed: true,
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

userSchema.plugin(mongoosastic, {
    host: process.env.ELASTICSEARCH_URL,
    port: 9200
})

userSchema.pre('save', function (next) {//Don't change to arrow function..
    if (!this.isModified('password')) next()//return next()

    bcrypt.hash(this.password, 10).then(hash => {
        this.password = hash
        next()
    })
})

module.exports = mongoose.model('User', userSchema)