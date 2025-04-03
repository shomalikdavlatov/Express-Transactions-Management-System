import IO from './../utils/io.js';
import UsersService from './users.service.js';


export default class TransactionsService {
    constructor() {
        this.io = new IO();
        this.service = new UsersService();
    }
    async getAllTransactions() {
        return await this.io.readFile('transactions.json');
    }
    async getTransactionsById(id) {
        const allTransactions = await this.getAllTransactions();
        const transactions = allTransactions.filter((element) => {
            return element.fromUserId === id || element.toUserId === id;
        });
        return transactions;
    }
    async transactionGenerator(status, data) {
        const transactions = await this.getAllTransactions();
        const transaction = {
            id: transactions.length > 0 ? transactions.at(-1).id + 1 : 1,
            fromUserId: data.fromUserId,
            toUserId: data.toUserId,
            amount: data.amount,
            status,
            timestamp: new Date()
        }
        transactions.push(transaction);
        await this.io.writeFile('transactions.json', transactions);
        return transaction;
    }
    async createTransaction(data) {
        const fromUser = await this.service.getUserById(+data.fromUserId);
        const toUser = await this.service.getUserById(+data.toUserId);
        if (!fromUser || !toUser) {
            await this.transactionGenerator('failed', data);
            return {
                code: 404,
                status: "failed",
                message: "User not found."
            };
        }
        if (fromUser.balance < data.amount) {
            await this.transactionGenerator('failed', data);
            return {
                code: 400,
                status: "failed",
                message: "Insufficent balance"
            };
        }
        if (fromUser.usedLimit + data.amount > fromUser.monthlyLimit) {
            await this.transactionGenerator('failed', data);
            return {
                code: 403,
                status: "failed",
                message: "Monthly transfer limit exceeded."
            };
        }
        await this.service.updateUser(fromUser.id, { balance: fromUser.balance - data.amount });
        await this.service.updateUser(fromUser.id, { usedLimit: fromUser.usedLimit + data.amount });
        await this.service.updateUser(toUser.id, { balance: toUser.balance + data.amount });
        const transaction = await this.transactionGenerator('success', data);
        return {
            code: 200,
            transactionId: transaction.id,
            status: "success",
            message: "Transaction completed successfully."
        };
    }
}