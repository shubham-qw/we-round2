const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const userSchema = new Schema ({
    "name" : {type : String ,required : [true, "Name required"]},
    "password" : {type : String, required : [true, "Password required"]},
    "email" : {type : String ,minLength : 6, required : [true, "Email required"]}
})

module.exports = model("User", userSchema);