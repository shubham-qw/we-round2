const express = require('express');
const router = express.Router();
const User = require("../model/user");
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const secret = process.env.SECRET;
const verifytoken = require("../middleware/auth");
const genToken = async (userId) => {
    return await jsonwebtoken.sign({ userId }, secret);
}



router.post("/signup", async function (req, res) {
    try {
        const { email, name, password } = req.body;

        const isUser = await User.findOne({email});

        if (isUser) {
            res.status(400).send({"msg" : "User already exist."});
        }
        else {
        const salt = await bcrypt.genSalt(7);
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({ email, name, password: hashedPassword });
        const token = await genToken(user._id);
        await user.save()
            .then((newUser) => {
                res.status(200).send({ success : true,user: newUser, token });
            })
            .catch((err) => {
                res.status(400).send({ err: err });
            })
        }    
    }
    catch (err) {
        res.status(400).send({ err: err.message });
    }
})

router.post("/login", async function (req, res) {
    try {
        const { email, password } = req.body;

        await User.findOne({ email })
            .then(async (user) => {
                if (user) {
                    const checkPassword = await bcrypt.compare(password, user.password);

                    if (!checkPassword) {
                        res.status(400).send({"msg" : "Incorrect Password"})
                    }
                    else {
                        const token = await genToken(user._id);
                        res.status(200).send({success : true, token, user});
                    }
                }
                else {
                    res.status(400).send({ "msg": "user does not exist!!" });
                }
            })
            .catch ((err) => {
                res.status(400).send({err : err.message});
            })

    }
    catch (err) {
        res.status(400).send({ err: err.message });
    }

})

router.get("/check-auth", verifytoken, async function (req,res) {
    res.status(200).send({"msg" : "User verified"});
} )

module.exports = router;



