import express from 'express'
import { redirectLink } from '../controllers/redirect.js';

const router = express.Router()

router.get('/:nano', redirectLink)

export default router;

