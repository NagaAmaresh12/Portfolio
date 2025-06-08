import express from 'express';
import { sendMail } from '../controller/mailController.js';

const router = express.Router();

router.post('/send', sendMail);

export default router;
