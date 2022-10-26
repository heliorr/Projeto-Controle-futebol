import * as express from 'express';
import UsersController from '../controllers/Users';
import { valitadeToken } from '../utils/JWT';

const router = express.Router();
const usersController = new UsersController();

router.post('/', async (req, res) => {
  const { body: { email, password } } = req;
  const { code, message, value } = await usersController.userLogin(email, password);
  res.status(code).json({ [message]: value });
});

router.post('/validate', valitadeToken, async (req, res) => {
  const { code, message, value } = await usersController.userRole(req.header('Authorization'));
  res.status(code).json({ [message]: value });
});

export default router;
