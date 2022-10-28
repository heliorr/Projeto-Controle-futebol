import * as express from 'express';
import LeaderBoardController from '../controllers/LeaderBoard';

const router = express.Router();
const leaderBoardController = new LeaderBoardController();

router.get('/home', async (req, res) => {
  const { code, value } = await leaderBoardController.findLeaderBoardHome();
  return res.status(code).json(value);
});

router.get('/away', async (req, res) => {
  const { code, value } = await leaderBoardController.findLeaderBoardAway();
  return res.status(code).json(value);
});

export default router;
