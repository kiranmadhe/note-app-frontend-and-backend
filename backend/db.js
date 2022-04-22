const mongoose = require('mongoose');
const router = require('./routes/auth');
const { route } = require('./routes/auth');
const mongoURI = "mongodb://localhost:27017/newDb"

const connectToMongo = () => {
    mongoose.connect(mongoURI, () =>{
        console.log("connected sucessfully!!!");
    })
}

module.exports = connectToMongo;