import express, {Router} from 'express';

import {postComment} from '$controllers/comments';
import {checkJWT} from '$middlewares/account';

const router: Router = express.Router();

router.post('/', [checkJWT], postComment);

export default router;