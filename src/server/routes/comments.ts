import express, {Router} from 'express';

import {postComment} from '$controllers/comments';

const router: Router = express.Router();

router.post('/', postComment);

export default router;