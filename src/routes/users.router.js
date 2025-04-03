import { Router } from 'express';
import UsersController from './../controllers/users.controller.js';

const router = Router();
const controller = new UsersController();

router.get('/users/:id', controller);
router.get('/users/:id/balance', controller);
router.post('/users', controller);
router.put('/users', controller);

export default router;