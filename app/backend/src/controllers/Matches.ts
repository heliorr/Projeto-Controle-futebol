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
}
