import express, {Router} from 'express';

import {getQuestions, getQuestion, postQuestion} from '$controllers/questions';
import {checkJWT} from '$middlewares/account';

const router: Router = express.Router();

router.get('/', getQuestions);
router.get('/:id', getQuestion);
router.post('/',[checkJWT], postQuestion);

export default router;