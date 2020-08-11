import express from 'express';

import account from './account';
import questions from './questions';

const router = express.Router();

router.use('/account', account);
router.use('/questions', questions);

export default router;