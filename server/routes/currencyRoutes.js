import express from 'express';
import { convertCurrencyController } from '../controller/currencyController.js';

const router = express.Router();


router.get('/convert', convertCurrencyController);

export { router as CurrencyRouter };
