import TransactionsService from './../services/transactions.service.js';


export default class TransactionsController {
    constructor() {
        this.service = new TransactionsService();
    }
}