import UsersService from './../services/users.service.js';


export default class UsersController {
    constructor() {
        this.service = new UsersService();
    }
    async getAllUsers(req, res) {
        try {
            const users = await this.service.getAllUsers();
            res.status(200).json(users);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getUserById(req, res) {
        try {
            const user = await this.service.getUserById(+req.params.id);
            if (user) res.status(200).json(user);
            res.status(404).json({ message: "User not found." });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getUserBalance(req, res) {
        try {
            const balance = await this.service.getUserBalance(+req.params.id);
            if (balance !== undefined) res.status(200).json({ balance });
            res.status(404).json({ message: "User not found." });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async createUser(req, res) {
        try {
            await this.service.createUser(req.body);
            res.status(201).json({ message: "User has been created." });
        }        
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async updateUser(req, res) {
        try {
            await this.service.updateUser(+req.params.id, req.body);
            res.status(200).json({ message: "User has been updated." });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async updateUserLimit(req, res) {
        try {
            await this.service.updateUserLimit(+req.params.id, req.body);
            res.status(200).json({ message: "Limit has been updated." });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}