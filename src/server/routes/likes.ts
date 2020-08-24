import express, {Router} from 'express';

import {postLike} from '$controllers/likes';

const router: Router = express.Router();

router.post('/', postLike);

export default router;