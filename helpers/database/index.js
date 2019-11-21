const mongoose = require('mongoose')
module.exports = () => {
    mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    mongoose.connection.on('open', () => {
        console.log('Database: Connected.')
    })

    mongoose.connection.on('error', (error) => {
        console.log('Database: Error', error)
    })

    mongoose.Promise = global.Promise
}