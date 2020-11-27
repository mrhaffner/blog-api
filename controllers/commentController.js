import Comment from '../models/comment'

const create_comment = [
    body('text', 'Text must be specified').trim().isLength({ min: 1 }).escape(),
    body('author', 'Author must be specified').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => {
        const errors = validationsResult(req);
        const comment = new Comment(
            {
                text: req.body.text,
                author: req.body.author,
                post: req.params.id,
            }
        );
        if (validationResults.errors.length) {
            return res.status(400).json( { message: 'Validation errors', errors: validationResults.errors });
        };
        comment.save((err) => {
            if (err) { return next(err); };
            res.sendStatus(201);
        })
    }
];

const delete_comment = (req, res, next) => {
    Comment.findByIdAndRemove(req.params.id, (err) => {
        if (err) { return next(err); };
        res.sendStatus(200);
    })
};

//do I need to get a list of comments? Maybe that should happen on getting a post?

export { 
    create_comment, 
    delete_comment
}