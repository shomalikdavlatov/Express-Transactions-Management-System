import UsersService from './../services/users.service.js';


export default class UsersController {
    constructor() {
        this.service = new UsersService();
    }
}