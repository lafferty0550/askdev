import express, {Router} from 'express';

import {postStar} from '$controllers/stars';
import {checkJWT} from '$middlewares/account';

const router: Router = express.Router();

router.post('/', [checkJWT], postStar);

export default router;