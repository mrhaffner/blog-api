const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController')

//lists all posts
router.get('/', postController.list_post)

//shows a specific post
router.get('/:id', postController.display_post)

//creates a new post
router.post('/', postController.create_post)

// //gets edit form for specific post
// router.get('/:id', postController.)

//updates a specific post
router.put('/:id/update', postController.update_post)

//deletes a post
router.delete('/:id/delete', postController.delete_post)

module.exports = router;
