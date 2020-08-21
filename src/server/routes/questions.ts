import express, {Router} from 'express';

import {getQuestions, getQuestion, postQuestion} from '$controllers/questions';

const router: Router = express.Router();

router.get('/', getQuestions);
router.get('/:id', getQuestion);
router.post('/', postQuestion);

export default router;