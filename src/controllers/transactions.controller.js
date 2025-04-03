import TransactionsService from './../services/transactions.service.js';


export default class TransactionsController {
    constructor() {
        this.service = new TransactionsService();
    }
    async getAllTransactions(req, res) {
        try {
            const transactions = await this.service.getAllTransactions();
            res.status(200).json(transactions);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async getTransactionsById(req, res) {
        try {
            const transactions = await this.service.getTransactionsById(+req.params.id);
            res.status(200).json(transactions);
        }
        catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    async createTransaction(req, res) {
        try {
            const result = await this.service.createTransaction(req.body);
            res.status(result.code).json({ status: result.status, message: result.message });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}