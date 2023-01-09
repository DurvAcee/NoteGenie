const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017"

const connectToMongo = () => {
    mongoose.set("strictQuery", false);                 // Used to supress annoying warning;
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully!");
    })
}

module.exports = connectToMongo;