import Post from '../models/post'

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
        res.json(post);
    })
};

const create_post = (req, res, next) => {
    
};

const update_post = (req, res, next) => {
    
};

const delete_post = (req, res, next) => {
    
};

export { 
    list_post, 
    display_post, 
    create_post, 
    update_post, 
    delete_post
}