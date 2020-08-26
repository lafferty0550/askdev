import express from 'express';

import account from './account';
import questions from './questions';
import comments from './comments';
import likes from './likes';
import stars from './stars';

const router = express.Router();

router.use('/account', account);
router.use('/questions', questions);
router.use('/comments', comments);
router.use('/likes', likes);
router.use('/stars', stars);

export default router;