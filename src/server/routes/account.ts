import express from 'express';

import {checkEmail, checkJWT, validate} from '../middlewares/account';
import {getMe, login, patchMe, refreshToken, register} from '../controllers/account';

const router = express.Router();

router.post('/login', [validate], login);
router.post('/register', [checkEmail, validate], register);
router.post('/token', refreshToken);

router.get('/me', [checkJWT], getMe);

router.patch('/me', [checkJWT], patchMe);

export default router;