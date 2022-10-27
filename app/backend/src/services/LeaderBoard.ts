import * as sequelize from 'sequelize';
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

export default class LeaderBoard {
  private matches = Matches;

  public findLeaderBoardHome = async (): Promise<IMatches[]> => {
    const result = await this.matches.findAll({
      include: [
        { model: Teams, as: 'name', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress: false },
      attributes: ['home_team', [
        sequelize.fn('sum', sequelize.col('home_team_goals')), 'goalsFavor'],
      [sequelize.fn('count', sequelize.col('home_team')), 'totalGames'],
      ],
      group: ['home_team'],
    });
    return result;
  };
}
