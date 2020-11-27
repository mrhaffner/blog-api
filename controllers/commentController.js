const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');

exports.create_comment = [
    body('text', 'Text must be specified').trim().isLength({ min: 1 }).escape(),
    body('author', 'Author must be specified').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        const comment = new Comment(
            {
                text: req.body.text,
                author: req.body.author,
                post: req.params.postId, //updated correctly?
            }
        );
        if (!errors.isEmpty()) {
            return res.status(400).json( { message: 'Validation errors', errors: validationResult.errors });
        };
        comment.save((err) => {
            if (err) { return next(err); };
            res.sendStatus(201);
        })
    }
];

exports.delete_comment = (req, res, next) => {
    Comment.findByIdAndRemove(req.params.commentId, (err) => {
        if (err) { return next(err); };
        res.sendStatus(200);
    })
};

//do I need to get a list of comments? Maybe that should happen on getting a post?