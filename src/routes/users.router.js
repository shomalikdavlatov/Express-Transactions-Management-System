import { Router } from 'express';
import UsersController from './../controllers/users.controller.js';

const router = Router();
const controller = new UsersController();

router.get('/users', (req, res) => controller.getAllUsers(req, res));
router.get('/users/:id', (req, res) => controller.getUserById(req, res));
router.get('/users/:id/balance', (req, res) => controller.getUserBalance(req, res));
router.post('/users', (req, res) => controller.createUser(req, res));
router.put('/users/:id', (req, res) => controller.updateUser(req, res));
router.put('/users/:id/limit', (req, res) => controller.updateUserLimit(req, res));

export default router;