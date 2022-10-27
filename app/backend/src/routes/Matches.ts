import * as express from 'express';
import MatchesController from '../controllers/Matches';
import { valitadeToken } from '../utils/JWT';

const router = express.Router();
const matchesController = new MatchesController();

router.get('/', async (req, res) => {
  const { inProgress } = req.query;
  const inProgressBoolean: boolean = inProgress === 'true';
  if (inProgress) {
    const { code, value } = await matchesController.filterAllMatches(inProgressBoolean);
    res.status(code).json(value);
  } else {
    const { code, value } = await matchesController.findallMatches();
    res.status(code).json(value);
  }
  return true;
});

router.post('/', valitadeToken, async (req, res) => {
  const {
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
  } = req.body;
  const { code, value } = await matchesController.insertMatche(
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
  );
  res.status(code).json(value);
});

export default router;
