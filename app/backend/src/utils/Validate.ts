import { Response, Request, NextFunction } from 'express';
import TeamsService from '../services/Teams';

const valitade = (req: Request, res: Response, next: NextFunction) => {
  const { body: { email, password } } = req;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};

const valitadeMatch = (req: Request, res: Response, next: NextFunction) => {
  const {
    homeTeam,
    awayTeam,
  } = req.body;
  if (homeTeam === awayTeam) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams' });
  }
  next();
};

const valitadeTeam = async (req: Request, res: Response, next: NextFunction) => {
  const teamsService = new TeamsService();
  const {
    homeTeam,
    awayTeam,
  } = req.body;
  const resultHomeTeam = await teamsService.findTeam(homeTeam);
  const resultawayTeam = await teamsService.findTeam(awayTeam);
  if (!resultHomeTeam || !resultawayTeam) {
    return res.status(404).json({
      message: 'There is no team with such id!' });
  }
  next();
};

export default { valitade, valitadeMatch, valitadeTeam };
