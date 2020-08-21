import express from 'express';

import account from './account';
import questions from './questions';
import comments from './comments';

const router = express.Router();

router.use('/account', account);
router.use('/questions', questions);
router.use('/comments', comments);

export default router;