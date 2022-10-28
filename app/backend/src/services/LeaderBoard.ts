import Matches from '../database/models/Matches';

export interface IMatches {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

const queryHome = `SELECT t.team_name as name,
(SUM(CASE WHEN home_team_goals > away_team_goals THEN 1 ELSE 0 END)*3+
SUM(CASE WHEN home_team_goals = away_team_goals THEN 1 ELSE 0 END)) as totalPoints,
COUNT(home_team) as totalGames,
SUM(CASE WHEN home_team_goals > away_team_goals THEN 1 ELSE 0 END) as totalVictories,
SUM(CASE WHEN home_team_goals = away_team_goals THEN 1 ELSE 0 END) as totalDraws,
SUM(CASE WHEN home_team_goals < away_team_goals THEN 1 ELSE 0 END) as totalLosses,
SUM(home_team_goals) as goalsFavor,
SUM(away_team_goals) as goalsOwn,
(SUM(home_team_goals)-SUM(away_team_goals)) as goalsBalance,
FORMAT(((SUM(CASE WHEN home_team_goals > away_team_goals THEN 1 ELSE 0 END)*3+
SUM(CASE WHEN home_team_goals = away_team_goals THEN 1 ELSE 0 END))/
(COUNT(home_team)*3))*100, 2) as efficiency
FROM TRYBE_FUTEBOL_CLUBE.matches as m
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams as t
ON m.home_team = t.id
WHERE in_progress = 0
GROUP BY t.id
ORDER BY totalPoints DESC, totalVictories DESC,
goalsBalance DESC, goalsFavor DESC, goalsOwn ASC;`;

export default class LeaderBoard {
  private matches = Matches;

  public findLeaderBoardHome = async (): Promise<unknown[] | undefined> => {
    const result = await this.matches.sequelize?.query(queryHome);
    if (result) return result[0];
  };
}
