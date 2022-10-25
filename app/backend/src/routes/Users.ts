import * as Router from 'express';
import UsersController from '../controllers/Users';

const router = Router();
const usersController = new UsersController();

router.post('/', async (req, res) => {
  const { body: { email, password } } = req;
  const { code, message, value } = await usersController.userLogin(email, password);
  res.status(code).json({ [message]: value });
});

export default router;
