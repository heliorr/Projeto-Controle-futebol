import * as express from 'express';
import UsersController from '../controllers/Users';
import { valitadeToken } from '../utils/JWT';
import valitade from '../utils/Validate';

const router = express.Router();
const usersController = new UsersController();

router.post('/', valitade.valitade, async (req, res) => {
  const { body: { email, password } } = req;
  const { code, message, value } = await usersController.userLogin(email, password);
  res.status(code).json({ [message]: value });
});

router.get('/validate', valitadeToken, async (req, res) => {
  const { code, message, value } = await usersController.userRole(req.header('authorization'));
  res.status(code).json({ [message]: value });
});

export default router;
