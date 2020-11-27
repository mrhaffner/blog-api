import Post from '../models/post'
import Comment from '../models/comment'

const list_post = (req, res, next) => {
    Post.find({})
        .exec((err, post_list) => {
            if (err) return next(err)
            res.json(post_list);
    })
};

const display_post = (req, res, next) => {
    Post.findById(req.params.id)
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
};

const create_post = (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        text: req.body.text,
    }).save((err) => {
        if (err) { return next(err); }
        res.sendStatus(200);
    })
};

const update_post = (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        date: new Date(req.body.date), //maybe just leave it out?
        _id: req.params.id
    });
    Post.findByIdAndUpdate(req.params.id, post, {}, (err) => {
        if (err) { return next(err); };
        res.sendStatus(201);
    })
};

const delete_post = async (req, res, next) => {
    try {
        await Comment.deleteMany( {post: req.params.id} );
        await Post.findByIdAndRemove(req.params.id);
        res.sendStatus(200);
    } catch (err) {
        debug(err);
        next(createError(500));
    }
}

export { 
    list_post, 
    display_post, 
    create_post, 
    update_post, 
    delete_post
}