/*
    Routes for Auth
    host + /api/auth
*/

import {Router} from 'express';
import { check } from 'express-validator'

import {loginUser, newUser, validToken} from '../controllers/auth.js'
import { bodyValidator } from '../middlewares/body-validator.js';

const router = Router();

router.post(
    '/new',
    [
        check('name', 'Name is mandatory').not().isEmpty(),
        check('email', 'Email is mandatory').isEmail(),
        check('password', 'Password should be 6 char long').isLength({min: 6}),
        bodyValidator
    ],
    newUser)

router.post('/',
    [
        check('email', 'Email is mandatory').isEmail(),
        check('password', 'Password should be 6 char long').isLength({min: 6}),
        bodyValidator
    ],
    loginUser)

router.get('/renew', validToken)

export default router;
