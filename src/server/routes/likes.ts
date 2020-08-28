import express, {Router} from 'express';

import {postLike} from '$controllers/likes';
import {checkJWT} from '$middlewares/account';

const router: Router = express.Router();

router.post('/', [checkJWT], postLike);

export default router;