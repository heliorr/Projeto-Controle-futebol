import * as express from 'express';
import MatchesController from '../controllers/Matches';

const router = express.Router();
const matchesController = new MatchesController();

router.get('/', async (req, res) => {
  const { code, value } = await matchesController.findallMatches();
  res.status(code).json(value);
});

export default router;
