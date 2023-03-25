const express = require("express");
const app = express();
require('dotenv').config();
const dbConnect = require("./db");
app.use(express.json());
dbConnect();

app.use("/api", require("./routes/user"));

app.post("/signup" , async function (req,res)  {
    res.send("running");
})

app.get("/", function (req,res) {
    res.send("Working");
})

app.listen(3000, function() {
    console.log("server running at port 3000");
})