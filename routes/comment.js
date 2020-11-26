import { Router } from 'express';
const router = Router();
import * as commentController from '../controllers/commentController'


//maybe want to get a list of comment for a post and/or single post

//create a comment
router.post('/comment', commentController.create_comment)

//delete a comment
router.delete('/:id', commentController.delete_comment)

export default router;