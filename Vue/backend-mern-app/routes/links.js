import express from 'express'
import { createLink, getAllLinks, getLink, removeLink, updateLink } from '../controllers/links.js';
import { requireToken, validationResults, validLink } from '../middlewares/index.js';
import { check } from 'express-validator';


const router = express.Router()

router.post(
    '/',[
        check('fullLink', 'Submit a valid link').trim().notEmpty(),
        validationResults,
        validLink,
        requireToken,
    ],
    createLink)

router.get('/', requireToken, getAllLinks)

router.get('/:nano', getLink)

router.patch(
    '/:id',[
        check('fullLink', 'Submit a valid link').trim().notEmpty(),
        check('id', 'Incorrect data on id').trim().notEmpty().escape(),
        validationResults,
        validLink,
        requireToken,
    ],
    updateLink)

router.delete(
    '/:id',[
        check('id', 'Incorrect data on id').trim().notEmpty().escape(),
        validationResults,
        requireToken,
    ],
    removeLink)

export default router;
