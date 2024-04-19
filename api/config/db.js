
const mongoose = require('mongoose')

const url = process.env.MONGODB_URL


const options = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    dbName: process.env.DATABASE_NAME
}

module.exports.startDB = function startDB(operations) {

    mongoose.connect(url, options)
        .then(function (client) {
            console.log('database connected sucessfully!')
            // execute operations
            // operations.forEach(operation => operation(client))
        })
        .catch(function (error) {
            console.log(error)
            console.log('there was an error with DATABASE')
        })
}
