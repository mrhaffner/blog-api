const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController')


//maybe want to get a list of comment for a post and/or single post

//create a comment
router.post('/comment', commentController.create_comment)

//delete a comment
router.delete('/:id', commentController.delete_comment)

module.exports = router;
