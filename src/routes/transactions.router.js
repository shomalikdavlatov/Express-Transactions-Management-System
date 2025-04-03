import { Router } from 'express';
import TransactionsController from './../controllers/transactions.controller.js';

const router = new Router();
const controller = new TransactionsController();

router.get('/transactions/history/:id', controller);
router.post('/transactions/transfer', controller);

export default router;