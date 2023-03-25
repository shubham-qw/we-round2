const mongoose = require("mongoose");
const uri = process.env.URI;
mongoose.set('strictQuery', false);
const mongoDB = async () => {
    await mongoose.connect(uri, { useNewUrlParser: true })
    .then (()=> {
        console.log("connection successfull");
    })
    .catch((error) => {
        console.log(error);
    })
}

module.exports = mongoDB;