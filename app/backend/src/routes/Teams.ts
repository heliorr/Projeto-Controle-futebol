import * as express from 'express';
import TeamsController from '../controllers/Teams';

const router = express.Router();
const teamsController = new TeamsController();

router.get('/', async (req, res) => {
  const { code, value } = await teamsController.findallTeams();
  res.status(code).json(value);
});

router.get('/:id', async (req, res) => {
  const { params: { id } } = req;
  const { code, value } = await teamsController.findTeam(id);
  res.status(code).json(value);
});

export default router;
