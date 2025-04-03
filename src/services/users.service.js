import IO from './../utils/io.js';


export default class UsersService {
    constructor() {
        this.io = new IO();
    }
    async getAllUsers() {
        return await this.io.readFile('users.json');
    }
    async getUserById(id) {
        const users = await this.getAllUsers();
        const user = users.find((element) => element.id === id);
        return user;
    }
    async getUserBalance(id) {
        const user = await this.getUserById(id);
        return user.balance;
    }
    async createUser(monthlyLimit) {
        const users = await this.getAllUsers();
        const user = {
            id: users.length > 0 ? users.at(-1).id + 1 : 1,
            balance: 0,
            ...monthlyLimit,
            usedLimit: 0
        };
        users.push(user);
        await this.io.writeFile('users.json', users);
    }
    async updateUser(id, data) {
        let users = await this.getAllUsers();
        users = users.map((element) => {
            if (element.id === id) {
                return {
                    ...element,
                    ...data
                };
            }
            return element;
        });
        await this.io.writeFile('users.json', users);
    }
    async updateUserLimit(id, limit) {
        let users = await this.getAllUsers();
        users = users.map((element) => {
            if (element.id === id) {
                return {
                    ...element,
                    monthlyLimit: limit.newLimit
                };
            }
            return element;
        });
        await this.io.writeFile('users.json', users);
    }
}