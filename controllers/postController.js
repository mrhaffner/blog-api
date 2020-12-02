const Post = require('../models/post')
const Comment = require('../models/comment')


exports.list_published_post = (req, res, next) => {
    Post.find({ isPublished: true })
        .exec((err, post_list) => {
            if (err) return next(err)
            res.json(post_list);
    })
};

exports.list_post = (req, res, next) => {
    Post.find({})
        .exec((err, post_list) => {
            if (err) return next(err)
            res.json(post_list);
    })
};

exports.display_post = (req, res, next) => {
    Post.findById(req.params.postId)
    .exec((err, post) => {
        if (err) {
            return next(err)
        } else if (post == null) {
            let err = new Error('No Such Post');
            err.status = 404;
            return next(err)
        }
        res.json(post); //what does this even mean lmao
    })
}; //should this also get all associated comments?

exports.create_post = (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        date: Date.now()
    }).save((err) => {
        if (err) { return next(err); }
        res.sendStatus(201);
    })
};

exports.update_post = (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        //date: new Date(req.body.date), //maybe just leave it out?
        //isPublished?
        _id: req.params.postId
    });
    Post.findByIdAndUpdate(req.params.postId, post, {}, (err) => {
        if (err) { return next(err); };
        res.sendStatus(201);
    })
};

exports.publish_post = (req, res, next) => {
    const post = new Post({
        // title: req.body.title,
        // text: req.body.text,
        //date: new Date(req.body.date), //maybe just leave it out?
        isPublished: req.body.published,
        _id: req.params.postId
    });
    Post.findByIdAndUpdate(req.params.postId, post, {}, (err) => {
        if (err) { return next(err); };
        res.sendStatus(201);
    })
};

exports.delete_post = async (req, res, next) => {
    try {
        await Comment.deleteMany( {post: req.params.postId} );
        await Post.findByIdAndRemove(req.params.postId);
        res.sendStatus(200);
    } catch (err) {
        debug(err);
        next(createError(500));
    }
}

//do I need something for updated isPublished?