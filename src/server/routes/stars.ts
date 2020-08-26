import express, {Router} from 'express';

import {postStar} from '$controllers/stars';

const router: Router = express.Router();

router.post('/', postStar);

export default router;