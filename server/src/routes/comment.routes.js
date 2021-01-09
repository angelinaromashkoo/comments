const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/require.auth');

const Comment = mongoose.model('Comment');

const router = express.Router();

router.use(requireAuth);

router.get('/comments', async(req,res) => {
    const {receiverId} = req.query;
    try {
       await res.status(201).json(await Comment.find({receiverId}))
    } catch(err) {
        await res.status(err.status).json({error: true, message: 'Error get comments'})
    }
});

router.post('/comments/create', async (req,res) => {
    const {senderId, receiverId, comment} = req.body;
    const commentRequest = new Comment({senderId, receiverId, comment});

    if(!comment) {
        return res.status(422).send({error: 'You must provide a comment'});
    }

    try {
        await res.status(201).json({comment: await commentRequest.save()})
    } catch(err) {
        res.status(422).send({error: err.message});
    }
});


router.post('/comments/edit', function(req,res){
    const {id} = req.query;

    //console.log(req.body, 'reqbody')
    console.log(id, 'id')
    console.log(res, 'RES')
    console.log(req, 'REQ')

    Comment.findOneAndUpdate(
        {_id: id},
        {$set: req.body},
        { new: true},
        function(err, commentUpdate) {
            console.log(commentUpdate);
            return res.send(commentUpdate);
        })
});

router.delete('/comments/delete', (req, res) => {
    const {id} = req.query;

    Comment.findOneAndDelete(
        {_id: id},
        {useFindAndModify: false},
        function (err) {
            err ? res.status(422).send({error: 'Error'}) : res.status(201).json({message: 'Success'})
        })
});

module.exports = router;
