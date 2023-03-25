const jsonwebtoken = require('jsonwebtoken');

const  verifytoken = async (req,res,next) =>{
    const token = req.headers["token"];

    if (token) {
        token = token.split(' ')[1];
        jsonwebtoken.verify(token, process.env.SECRET, (err, valid) => {
            if (err) {
                res.status(400).send({err : err.message});
            }
            else {
                if (valid) {
                    res.status(200).send({"msg" : "token Valid"});
                }
                else {
                    res.status(400).send({"msg" : "token Invalid"})
                }
            }
        })
    }
    else {
        res.status(400).send("Token not found");
    }
    next();
} 

module.exports = verifytoken;