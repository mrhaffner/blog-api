const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController')
const passport = require('passport');
const auth = passport.authenticate('jwt', { session: false })
require('../auth/auth');

//lists all published posts
router.get('/', postController.list_published_post)

//maybe have a nonprotected route only for published posts??? Don't want that available huh.
//have protected route for unpublished

//lists all posts
router.get('/all', auth, postController.list_post)

//shows a specific post
router.get('/:postId', postController.display_post)

//creates a new post
router.post('/', auth, postController.create_post)

// //gets edit form for specific post --- I don't think I need this, can populate from the json?
// router.get('/:id', postController.)

//updates a specific post's title and text
router.put('/:postId/update', auth, postController.update_post)

//updates a specific post's isPublished status
//add back auth!!!!!!!
router.put('/:postId/publish', postController.publish_post)

//deletes a post
router.delete('/:postId/delete', auth, postController.delete_post)

module.exports = router;
