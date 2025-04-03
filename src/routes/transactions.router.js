import { Router } from 'express';
import TransactionsController from './../controllers/transactions.controller.js';

const router = new Router();
const controller = new TransactionsController();

router.get('/transactions/history/', (req, res) => controller.getAllTransactions(req, res));
router.get('/transactions/history/:id', (req, res) => controller.getTransactionsById(req, res));
router.post('/transactions/transfer', (req, res) => controller.createTransaction(req, res));

export default router;