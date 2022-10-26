import * as express from 'express';
import TeamsController from '../controllers/Teams';

const router = express.Router();
const teamsController = new TeamsController();

router.get('/', async (req, res) => {
  const { code, value } = await teamsController.findallTeams();
  res.status(code).json({ value });
});

export default router;
