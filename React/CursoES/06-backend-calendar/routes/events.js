/*
    Routes for Events
    host + /api/events
*/

import {Router} from 'express'
import { check } from 'express-validator'

import { jwtValidator } from '../middlewares/jwt-validator.js'
import { deleteEvent, getEvents, newEvent, updateEvent } from '../controllers/events.js'
import { isDate } from '../helpers/isDate.js'
import { bodyValidator } from '../middlewares/body-validator.js'

const router = Router()

//middleware for all events
router.use(jwtValidator)

router.get('/', getEvents)

router.post('/',
    [
        check('title', 'Title is mandatory').not().isEmpty(),
        check('start', 'Starting date is mandatory').custom(isDate),
        check('end', 'Ending date is mandatory').custom(isDate),
        bodyValidator
    ]
    ,newEvent)

router.put('/:id', updateEvent)

router.delete('/:id', deleteEvent)


export default router;
