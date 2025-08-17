import express from 'express'
import { check } from 'express-validator';

import { infoUser, loginUser, logoutUser, refreshToken, registerUser } from '../controllers/auth.js';
import { validationResults, requireToken, requireRefreshToken } from '../middlewares/index.js';

const router = express.Router()

router.post(
    '/login',
    [
        check('email', 'Email is mandatory').isEmail(),
        check('password', 'Password must be 6 char long').isLength({min: 6}),
        validationResults,
    ],
    loginUser);

router.post(
    '/register',
    [
        check('email', 'Email is mandatory').isEmail(),
        check('password', 'Password must be 6 char long').isLength({min: 6}),
        check('password2', 'No matching passwords').custom((value, {req}) => {
            if(value !== req.body.password){
                throw new Error("No matching passwords")
            }
            return value;
        }),
        validationResults,
    ],
    registerUser);

router.get(
    '/refresh',
    [requireRefreshToken],
    refreshToken,
)

router.get('/logout' ,logoutUser)

//just for testing not part of auth
router.get(
    '/protected',
    requireToken,
    infoUser
)

export default router
