import express from 'express';

import {getQuestions, getQuestion} from '../controllers/questions';

const router = express.Router();

router.get('/', getQuestions);
router.get('/:id', getQuestion);

export default router;