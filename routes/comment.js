const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController')
const passport = require('passport');
const auth = passport.authenticate('jwt', { session: false })
require('../auth/auth');

//maybe want to get a list of comment for a post and/or single post
//get all comments
router.get('/comments', commentController.list_comment)

//create a comment
router.post('/:postId/comment', auth, commentController.create_comment)

//delete a comment
//add auth back!!!!!!!!!!!!!!!!!!
router.delete('/:postId/comment/:commentId', auth, commentController.delete_comment)

module.exports = router;
