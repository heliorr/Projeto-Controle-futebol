import * as express from 'express';
import MatchesController from '../controllers/Matches';

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

export default router;
