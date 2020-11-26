import { Router } from 'express';
const router = Router();
import * as commentController from '../controllers/commentController'

//create a comment
router.post('/comment', commentController.create_comment)

//delete a comment
router.delete('/:commentID', commentController.delete_comment)

export default router;