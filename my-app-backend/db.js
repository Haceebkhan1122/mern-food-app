const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/full-mern-stack-video'

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log("Database connected")
    } catch (error) {
        console.log(error.message)
    }

}

module.exports = connectToMongo;