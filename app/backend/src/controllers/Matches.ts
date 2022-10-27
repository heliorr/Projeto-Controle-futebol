import Matches from '../services/Matches';

export default class matchesController {
  constructor(private _MatchesService = new Matches()) {}

  public findallMatches = async () => {
    const result = await this._MatchesService.findallMatches();
    return { code: 200, value: result };
  };

  public filterAllMatches = async (inProgress: boolean) => {
    const result = await this._MatchesService.filterAllMatches(inProgress);
    return { code: 200, value: result };
  };

  public insertMatche = async (
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) => {
    const result = await this._MatchesService.insertMatche(
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
    );
    return { code: 201, value: result };
  };
}
