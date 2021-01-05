const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();


router.post('/signup', async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const user = new User({name, email, password});
        await user.save();

        const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY')
        res.send({token});
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.post('/signin', async (req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password){
        return res.status(422).send({error: 'Must provide name, email and password'});
    }

    const user = await User.findOne({email});
    if (!user) {
        return res.status(422).send({error: 'Invalid password or email'});
    }

    try {
        await user.comparePassword(password);
        const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY');
        res.send({token});
    } catch(err) {
        return res.status(422).send({error: 'Invalid password or email'});
    }
});

router.get('/users', async (req, res) => {
    const users = await User.find({});

    const userMap = {};
    users.forEach((user) => {
        userMap[user.name] = user; //or [user._id]
    });
    res.send(userMap);
    console.log(userMap);
});

module.exports = router;
