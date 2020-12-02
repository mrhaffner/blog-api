const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');

exports.list_comment = (req, res, next) => {
    Comment.find({})
        .exec((err, comment_list) => {
            if (err) return next(err)
            res.json(comment_list);
    })
};

exports.create_comment = [
    body('text', 'Text must be specified').trim().isLength({ min: 1 }),
    body('author', 'Author must be specified').trim().isLength({ min: 1 }),
    (req, res, next) => {
        const errors = validationResult(req);
        const comment = new Comment(
            {
                text: req.body.text,
                author: req.body.author,
                post: req.params.postId,
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