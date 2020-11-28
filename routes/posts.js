const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController')

//lists all posts
//router.get('/', postController.list_post) uncomment!!!
router.get(
    '/',
    (req, res, next) => {
      res.json({
        message: 'You made it to the secure route',
        user: req.user,
        token: req.query.secret_token
      })
    }
  );

//maybe have a nonprotected route only for published posts??? Don't want that available huh.
//have protected route for unpublished

//shows a specific post
router.get('/:postId', postController.display_post)

//creates a new post
router.post('/', postController.create_post)

// //gets edit form for specific post --- I don't think I need this, can populate from the json?
// router.get('/:id', postController.)

//updates a specific post
router.put('/:postId/update', postController.update_post)

//deletes a post
router.delete('/:postId/delete', postController.delete_post)

module.exports = router;
