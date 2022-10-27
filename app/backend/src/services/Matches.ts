import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

export interface IMatches {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export default class MatchesService {
  private matches = Matches;

  public findallMatches = async (): Promise<IMatches[]> => {
    const result = await this.matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return result;
  };

  public filterAllMatches = async (inProgress: boolean): Promise<IMatches[]> => {
    const result = await this.matches.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return result;
  };

  public insertMatche = async (
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatches> => {
    const result = await this.matches.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true,
    });
    return result;
  };

  public updateMatche = async (
    id: number,
  ): Promise<void> => {
    await this.matches.update({ inProgress: false }, { where: { id } });
  };
}
