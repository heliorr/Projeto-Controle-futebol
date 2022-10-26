import Teams from '../services/Teams';

export interface ITeams {
  id: number;
  teamName: string;
}

export default class TeamsController {
  constructor(private _TeamsService = new Teams()) {}

  public findallTeams = async () => {
    const result = await this._TeamsService.findallTeams();
    return { code: 200, value: result };
  };

  public findTeam = async (id: string) => {
    const result = await this._TeamsService.findTeam(id);
    return { code: 200, value: result };
  };
}
